var express = require("express");
var AssignmentDomain = require("../Domain/assignments");
var Assignmentrouter = express.Router();
const {verifytokens,authorizeRoles } = require("../Authentication/verifytokens");

class AssignmentController {
    //GET ALL USERS
    static async getallusers(req, res) {
        const assignmentdomain = new AssignmentDomain();
        assignmentdomain.getallusers(req, res);
    }

    //GET AN USER
    static async getanUser(req, res) {
        const assignmentdomain = new AssignmentDomain();
        assignmentdomain.getanUser(req, res);
    }

    //GET QUESTIONS
    static async getQuestions(req, res) {
        const assignmentdomain = new AssignmentDomain();
        assignmentdomain.getQuestions(req, res);
    }

    //GET AN QUESTION
    static async getanQuestion(req, res) {
        const assignmentdomain = new AssignmentDomain();
        assignmentdomain.getanQuestion(req, res);
    }

    //SUBMIT
    static async submit(req, res) {
        const assignmentdomain = new AssignmentDomain();
        assignmentdomain.submit(req, res);
    }


    //FINAL OUTPUT
    static async finalOutput(req, res) {
        const assignmentdomain = new AssignmentDomain();
        assignmentdomain.finalOutput(req, res);
    }



}


Assignmentrouter.get("/ass/getallusers", AssignmentController.getallusers);
Assignmentrouter.get("/ass/getanuser/:_id", AssignmentController.getanUser);
Assignmentrouter.get("/ass/getquestions", AssignmentController.getQuestions);
Assignmentrouter.get("/ass/getanquestion", AssignmentController.getanQuestion);
Assignmentrouter.post("/ass/submit", AssignmentController.submit);
Assignmentrouter.get("/ass/quiz", AssignmentController.finalOutput);

module.exports = Assignmentrouter;
