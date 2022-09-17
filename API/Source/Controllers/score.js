var express = require("express");
var ScoreDomain = require("../Domain/score");
var Scorerouter = express.Router();

class ScoreController{
    //POST
    static async postanswers(req,res)
    {
        const scoredomain = new ScoreDomain();
        scoredomain.postanswers(req,res);
    }

      //GET 
      static async getanswers(req,res)
    {
        const scoredomain = new ScoreDomain();
        scoredomain.getanswers(req,res);
    }

     //GET 
     static async getananswer(req,res)
     {
         const scoredomain = new ScoreDomain();
         scoredomain.getananswer(req,res);
     }

   


}

Scorerouter.post("/post/answer",ScoreController.postanswers);
Scorerouter.get("/answer",ScoreController.getanswers);
Scorerouter.get("/getanswer/:id", ScoreController.getananswer);



module.exports = Scorerouter;