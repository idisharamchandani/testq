const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
const QuestionModel = require("../Models/questions");
const UserModel = require("../Models/user");
const AssignmentModel = require("../Models/assignments");
const jwt = require('jsonwebtoken');
const config = require("../Authentication/global.config");
var bcrypt = require('bcryptjs');
const verifytokens = require('../Authentication/verifytokens');


class AssignmentDomain {
    getallusers = async (req, res) => {

        UserModel.find((err, data) => {
            res.send(data);
            res.end();
        });


    }

    getanUser = async (req, res) => {
        // UserModel.find({_id:req.body._id},(err, result) => {
        //     // res.send(data);
        //     // res.end();
        //     if(err){
        //         console.log(err)
        //     }
        //     else{
        //         console.log(result)
        //         res.json(result)
        //     }
        // })

        UserModel.find({_id:req.params._id})
            .then(data => {
                console.log("userData",data)
                res.send(data);
            })
            .catch(err => {
                console.log(err,"err")
                res.status(500).send({
                    message:
                        err.message || "Some error occurred."
                });
            });
    };



    getQuestions = async (req, res) => {

        QuestionModel.find((err, data) => {
            // res.send(data);
            // res.end();
            if (err) {
                console.log(err)
            }
            else {
                let result = (data || []).map((item) => {
                    return {
                        Questions: item.Questions,
                        Options: item.Options,
                        Subject: item.Subject,
                        Standard: item.Standard
                    };
                })
                // console.log(result)
                res.json(result)
            }
        })

    }



    getanQuestion = async (req, res) => {
        console.log("req.query.Standard : ",req.query.Standard)

        QuestionModel.find({Standard: req.query.Standard }, (err, data) => {
            // res.send(data);
            if (err) {
                console.log(err)
            }
            else {
                let result = (data || []).map((item) => {
                    return {
                        _id:item._id,
                        Questions: item.Questions,
                        Options: item.Options,
                        Subject: item.Subject,
                        Standard: item.Standard
                    };
                })
                // console.log(result,"s")
                res.json(result)
            }
        })
    }

    submit = async (req, res) => {

        console.log(req.body,"data")

        const { User, Questions } = req.body
        const assignment = await AssignmentModel.create({
            User, Questions
        });
        console.log(assignment,"Assignment")

        if (assignment) {
            return res.status(201).json({

                User: assignment.User,
                Questions: assignment.Questions
            });
        }
    }

    finalOutput = async (req, res) => {

        // var data = await AssignmentModel.find().populate("User").populate('Questions', '-Correct_Answers')
        var data = await AssignmentModel.find({User: req.query.userid })
        // .then(p=>res.json(p))
        // .catch(error=>console.log(error));
        res.send(data);
        res.end();
        // AssignmentModel.find((err, data)=>{
        //     console.log(data);
        //     res.send(data);
        //     res.end();
        // });

    }


}

// function data(up){
//     console.log("data")
//     return {
//         Questions:up.Questions,
//         Options:up.Options
//     }
// }






module.exports = AssignmentDomain;

