const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
const ScoreModel = require("../Models/score")
const jwt = require('jsonwebtoken');
const config = require("../Authentication/global.config");
var bcrypt = require('bcryptjs');
const verifytokens = require('../Authentication/verifytokens');



class ScoreDomain {
    postanswers = async (req, res) => {
        const{QuestionID, SelectedAnswer, UserID, Correct_Answer} = req.body
        const result = await ScoreModel.create({
            QuestionID,UserID,Correct_Answer
        });
        console.log("ans",result)
        if(result){
            return res.status(201).json({

                QuestionID: result.QuestionID,
                UserID: result.UserID,
                Correct_Answer:result.Correct_Answer

                
            });
        }
        if(SelectedAnswer == Correct_Answer){
            return result = result +1;

        }
        else{
            return result = 0;
        }
    }

    getanswers = async (req,res) => {
        ScoreModel.find((err, data)=>{
            // console.log(data)
            res.send(data);
            res.end();
        }); 
    }
}



module.exports = ScoreDomain;

