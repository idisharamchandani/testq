const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
const QuestionModel = require("../Models/questions")
const jwt = require('jsonwebtoken');
const config = require("../Authentication/global.config");
var bcrypt = require('bcryptjs');
const verifytokens = require('../Authentication/verifytokens');
var fs = require('fs');
const csvtojsonV2 = require("csvtojson");
const parse = require('csv-parse')
const admin = require("../Middleware/admin");
const upload = require("../Utils/multer");


class QuestionDomain {
    postquestion = async (req, res) => {

        console.log("questions")
        //     var questions= new QuestionModel(req.body);
        //     var result= await questions.save();
        //    res.send(result);
        //     res.end();
        //    res.send("file upload")
        //    res.status(201).json({
        //     success:true,
        //     post

        // const csvData = await csvtojsonV2().fromFile("data.csv")
        // const newData = []
        // for (let i = 0; i < csvData.length; i++) {
        //     newData.push({
        //         Questions: csvData[i].Questions,
        //         Options: [{
        //             Option1: csvData[i].Option1,
        //             Option2: csvData[i].Option2,
        //             Option3: csvData[i].Option3,

        //         }],
        //         Correct_Answers: csvData[i].Correct_Answers,
        //         Categories: csvData[i].Categories

        //     })

        // }

        // const datas = await QuestionModel.insertMany(newData);



        // res.send(datas);

        // const csvData = await csvtojsonV2().fromFile('data.csv')

        // const newData = []
        // for(let i =0 ; i < csvData.length ; i++)
        // {
        //     newData.push({
        //         Questions: csvData[i].Questions,
        //         Options:[{
        //             Option1: csvData[i].Option1,
        //             Option2: csvData[i].Option2,
        //             Option3: csvData[i].Option3
        //         }],
        //         Categories: csvData[i].Categories
        //     })
        //     console.log("newdata",newData)
        //     const data = await QuestionModel.insertMany(newData);

        //     res.send(data);
        // }


        // csvtojsonV2().fromFile(req.file.path)
        // .then(data => {
        //     console.log(data);
        //     let mapData = (data || []).map((item) => {
        //         item.Options = [];
        //         if(item.Option1)
        //         {
        //             item.Options.push(item.Option1);
        //         }
        //         if(item.Option2)
        //         {
        //             item.Options.push(item.Option2);
        //         }
        //         if(item.Option3)
        //         {
        //             item.Options.push(item.Option3);
        //         }
        //         return item;
        //     });
            
        //     console.log(mapData,"mddd")
        //     if(mapData.length.headers === "questions")
        //     {
        //         res.json({err:"not"})
        //         console.log("yyy")
        //     }
        //     else{
        //         QuestionModel.insertMany(mapData).then(function () {
        //             console.log("Data Inserted")
        //             res.json({ success: 'success' })
        //          } ).catch(function (error) {
        //             console.log(error);
        //             console.warn(error);
        //             res.json({ error: "errrrr" });
        //          })
        //     }
        // })

        csvtojsonV2().fromFile(req.file.path)
        .then(data => {
            console.log(data);
            let mapData = (data || []).map((item) => {
                item.Options = [];
                if (item.Option1) {
                    item.Options.push(item.Option1);
                }
                if (item.Option2) {
                    item.Options.push(item.Option2);
                }
                if (item.Option3) {
                    item.Options.push(item.Option3);
                }

                return item;

            });
            console.log(mapData)
            QuestionModel.insertMany(mapData).then(function () {
                console.log("Data Inserted")
                res.json({ success: 'success' })
                if (mapData.length < 6) {

                    console.log("ff")


                }
            }).catch(function (error) {
                console.log(error);
                console.warn(error);
                res.json({ error: "errrrr" });
            })
        })


        // csvtojsonV2().fromFile(req.file.path)
        //     .then(data => {
        //         console.log(data,"data");
        //         // let headers = [Questions]
        //         if(data.headers !="Questions")
        //         {
        //             console.log("ggg")
        //         }
        //         else{
        //             console.log("hhh")
        //         }

        //     })
        //         // //for(var x =0 ; x < data; x++)
        //         // // {
        //         // //     temp = parseFloat(data[x].Options.answer1)
        //         // //     data[x].Options.answer1 = temp
        //         // // }
        //         // // QuestionModel.insertMany(data, (err,datas) => {
        //         // //     if(err)
        //         // //     {
        //         // //         console.log(err)
        //         // //     } else{
        //         // //         res.redirect('/')
        //         // //     }
        //     });
        // // })

        // const { Standard, Questions, Correct_Answers, Options, Subject } = req.body;
        // const file = req.files.Questions

        // try {
        //     const result = await upload.single("file")
        //     if (req.file == undefined) {
        //         return res.status(400).send({
        //             message: "Please upload a csv file"
        //         })
        //     }
        //     let csvData = [];
        //     let filePath = __basedir + '/uploads' + req.file.filename;
        //     fs.createReadStream(filePath)
        //         .pipe(csv.parse({ headers: true }))
        //         .on("error", (error) => {
        //             throw error.message;
        //         })
        //         .on("data", (row) => {
        //             csvData.push(row)
        //         })
        //         .on("end", () => {
        //             res.send()
        //         })

        // } catch(error){
        //     console.log("catch error --",error);
        //     res.status(500).send({
        //         message:"Could not upload the file" + req.filename.originalname,
        //     });
        // }





    }


    getquestion = async (req, res) => {


        QuestionModel.find({}, (err, data) => {
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
                        Standard: item.Standard,
                        Correct_Answers: item.Correct_Answers
                    };
                })
                console.log(result)
                res.json(result)
            }
        })

        //     let result = await QuestionModel.find((questions)
        //     .then(

        //     questions(questions)
        //     // {

        //     //     // console.log(questions);
        //     //     return(questions)
        //     // })

        // )

    }

    // getanquestion = async (req, res) => {
    //     let id = req.body.id;
    //     let data = QuestionModel.find((e) => e.QuestionID == id);
    //     if (data) {
    //         QuestionModel.forEach((value) => {
    //             if (value.QuestionID == id) {
    //                 res.json(value);
    //             }
    //         });
    //     } else {
    //         res.status(404).send("Data Not Found");
    //     }
    // }

    getanquestion = async (req, res) => {

        QuestionModel.find({ _id: req.params.id }, (err, data) => {
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

                    };
                })
                console.log(result)
                res.json(result)
            }
        })
        //     var data= await QuestionModel.find({_id:req.params.id}).populate("Questions Options");
        // res.send(data);
        // res.end();

    }



    editquestion = async (req, res) => {


        let up_id = req.body._id;
        let upQuestions = req.body.Questions;
        let upOption1 = req.body.Option1;
        let upOption2 = req.body.Option2;
        let upOption3 = req.body.Option3;
        let upCorrect_Answers = req.body.Correct_Answers;
        let upSubject = req.body.Subject;

        QuestionModel.findOneAndUpdate({ _id: up_id }, { $set: { Questions: upQuestions, Option1: upOption1, Option2: upOption2, Option3: upOption3, Correct_Answers: upCorrect_Answers, Subject: upSubject } }, { new: true }, (err, result) => {
            if (err) {
                res.send("ERROR")
            }
            else {
                if (result == null) {
                    res.send("nothing found")
                }
                else {
                    res.send(result)
                }
            }
        })
    }

    deletequestion = async (req, res) => {
        var data = QuestionModel.find();
        data.deleteOne({ _id: req.body._id }).then(() => {
            console.log("Data Successfully Deleted");
        })
        res.send("Data Successfully Deleted");
        res.end();
    }
}

// function data(up){
//     console.log("data")
//     return {
//         Questions:up.Questions,
//         Options:up.Options
//     }
// }





module.exports = QuestionDomain;

