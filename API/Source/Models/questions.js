const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    // QuestionID:{type:Number},
    Standard:{type:Number},
    Questions:{type: String},
    // Option1:{type:String},
    // Option2:{type:String},
    // Option3:{type:String},
    // Correct_Answers:{type:String},
    // Options:[{
    //     Option1: {type:String},
    //     Option2:{type:String},
    //     Option3:{type: String},
    //     // isCorrect:{
    //     //     type:Number,
    //     //     default:1,
    //     // }
    // }],
    Correct_Answers:{type:String},
    Options:{type:Array},
    Subject:{type:String}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
},
{
    timestamps: true,
});

const QuestionModel = mongoose.model("questions",QuestionSchema);

module.exports = QuestionModel;