var express = require("express");
var QuestionDomain = require("../Domain/question");
var Questionrouter = express.Router();
const {verifytokens,authorizeRoles } = require("../Authentication/verifytokens");
const multer = require("multer");


class QuestionController{
    //POST
    static async postquestion(req,res)
    {
        const questiondomain = new QuestionDomain();
        questiondomain.postquestion(req,res);
    }

      //GET 
      static async getquestion(req,res)
    {
        const questiondomain = new QuestionDomain();
        questiondomain.getquestion(req,res);
    }

    static async getanquestion(req,res)
    {
        const questiondomain = new QuestionDomain();
        questiondomain.getanquestion(req,res);
    }

      //PUT 
      static async editquestion(req,res)
    {
        const questiondomain = new QuestionDomain();
        questiondomain.editquestion(req,res);
    }


       //DELETE 
       static async deletequestion(req,res)
       {
           const questiondomain = new QuestionDomain();
           questiondomain.deletequestion(req,res);
       }
   


}

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null, "uploads")
        },
        // filename: function(req,file,cb)
        // {
        //     cb(null, file.fieldname + "-" + Date.now() + ".csv")
        // }
        fileFilter: (req,file,cb) => {
            let ext = path.extname(file.fieldname);
            if(ext !== ".csv")
            {
                cb(new Error("File type is not supported"),false);
                return;
            }
            cb(null,true);
        },
    })
}).single("Questions")




Questionrouter.post("/post/question",upload,QuestionController.postquestion);
Questionrouter.get("/questions",QuestionController.getquestion);
Questionrouter.get("/getquestion/:id",verifytokens,authorizeRoles(true), QuestionController.getanquestion);
Questionrouter.put("/put/questions/:id",verifytokens,authorizeRoles(true),QuestionController.editquestion);
Questionrouter.delete("/delete/question/:id",verifytokens,authorizeRoles(true),QuestionController.deletequestion);



module.exports = Questionrouter;