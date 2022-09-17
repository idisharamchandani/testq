const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken');
const config = require("../Authentication/global.config");
var bcrypt = require('bcryptjs');
// var Userrouter = express.Router();
// const asyncHandler = require('express-async-handler');
const verifytokens = require('../Authentication/verifytokens');
// const QuestionModel = require("../Models/questions");

class UserDomain{
    //REGISTER
    registeranUser = async function (req, res){
        try{
            console.log(req.body);
            const {FirstName, LastName,Standard,Country,StreetAddress,Town_City,State,PinCode,Phone,Email,Password,isAdmin} = req.body
            
            const userExists = await UserModel.findOne({Email});
            
            if(userExists)
            {
                return res.status(400).json("An account is already registered with your email address. Please log in.");
            }
            
            const user = await UserModel.create({
            FirstName, LastName,Standard,Country,StreetAddress,Town_City,State,PinCode,Phone,Email,Password,isAdmin});
            
            if(user)
            {
                return res.status(201).json({
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Standard: user.Standard,
                    Country:user.Country,
                    StreetAddress:user.StreetAddress,
                    Town_City:user.Town_City,
                    State:user.State,
                    PinCode:user.PinCode,
                    Phone:user.Phone,
                    Email:user.Email,
                    Password:user.Password,
                    isAdmin:user.isAdmin
                });
            }
        } catch(ex) {
            console.log(ex,"errror");
            return res.status(500).send({errr:ex.errors.Email.message});
           
        }
    }

    //LOGIN
    loginUser = async function (req, res){
        UserModel.find({Email:req.body.Email})
    .exec()
    .then(user =>{
        console.log("user",req.body.Email)
        if(user.length < 1)
        {
            return res.status(401).json
            ({
                msg:"Unknown email address. Check again or try your username."
            })
        }else{
            console.log("Not found -----");
        }
        bcrypt.compare(req.body.Password,user[0].Password,(err,result) => 
        {
            if(!result)
            {
                return res.status(401).json
                ({
                    msg:`The password you entered for the email address ${user[0].Email} is incorrect. Lost your password?`
                })

            }
            // console.log('id',user[0]._id)
            if(result)
            {
                const token = jwt.sign({
                    _id:user[0]._id,
                    FirstName:user[0].FirstName,
                    LastName:user[0].LastName,
                    isAdmin:user[0].isAdmin
                },config.secretKey,
                {
                    algorithm: config.algorithm,
                    expiresIn:"24h"
                });
                res.status(200).json
                ({
                    _id:user[0]._id,
                    FirstName:user[0].FirstName,
                    LastName:user[0].LastName,
                    isAdmin:user[0].isAdmin,
                    jwtoken:token
                })
            }
        })
    }).catch(ex=>
       
        {
            
            console.log(ex,"errror");
            return res.status(500).send({errr:ex.errors.Email.message});
        })
    }

    //GETALLUSERS

    getallUsers = async function(req,res)
    {
        console.log("vdsghvc")
        UserModel.find((err, data)=>{
            console.log(data)
            res.send(data);
            res.end();
        });

    }

    //GET AN USER

    getanUser = async function(req,res)
    {
        UserModel.find({_id:req.body._id},(err, result) => {
            console.log("resuls",result);
            // res.send(data);
            // res.end();
            if(err){
                console.log(err)
            }
            else{
                console.log("RESULTS",result)
                res.json(result)
            }
        })
    }



    //USER DASHBOARD
    getAnUserDetails = async function (req, res){
        try{
            // token = req.headers.authorization.split(" ")[1];
            console.log(req.headers['x-access-token'])
            const verifytokens = jwt.verify(req.headers['x-access-token'],"QUIZ");
            if(verifytokens)
            {
                const userData = await UserModel.find({Email:req.body.Email},{FirstName:1,LastName:1,Standard:1,Country:1,StreetAddress:1,HouseType:1,Town_City:1,State:1,PinCode:1,isAdmin:1})
                console.log(userData)
                res.json({data:userData})

            }
            else
            {
                return res.status(401).send(error);
            }
        }catch (error) {
            // Access Denied
            return res.status(401).send(error);
        }
        
    }

    updateUserDetails = async function (req, res){
        let up_id=req.body._id;
        let upFirstName=req.body.FirstName;
        let upLastName=req.body.LastName;
        let upStandard=req.body.Standard;
        let upCountry=req.body.Country;
        let upStreetAddress=req.body.StreetAddress;
        let upTown_City=req.body.Town_City;
        let upState=req.body.State;
        let upPinCode=req.body.PinCode;
        let upisAdmin=req.body.isAdmin;
        
        UserModel.findOneAndUpdate({_id:up_id},{$set:{FirstName:upFirstName,LastName:upLastName,Standard:upStandard,Country:upCountry,StreetAddress:upStreetAddress,
            Town_City:upTown_City,State:upState,PinCode:upPinCode, isAdmin:upisAdmin}},{new:true},(err,result)=>
            {
                if(err)
                {
                    res.send("ERROR")
                }
                else
                {
                    if(result==null)
                    {
                        res.send("nothing found")
                    }
                    else
                    {
                        res.send(result)
                    }
                }
            })
    }

    

    //LOST PASSWORD

    lostPassword = async function (req, res){
        const resettoken = crypto.randomBytes(20).toString(hex);

        this.resetpasswordtoken = crypto.createHash(HS256).update(resettoken).digest(hex);
        this.resetpasswordexpire = Date.now() + 10 * 60 * 1000;

        return resettoken;
    }
}

module.exports = UserDomain;

