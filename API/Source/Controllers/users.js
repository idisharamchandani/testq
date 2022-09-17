var express = require("express");
var UserDomain = require("../Domain/user");
var Userrouter = express.Router();
const {verifytokens,authorizeRoles } = require("../Authentication/verifytokens");

class UserController{
    //REGISTER
    static async registeranUser(req, res) 
    {
        const userDomain = new UserDomain();
        userDomain.registeranUser(req, res);
    }

    //GET
    static async getallUsers(req,res)
    {
        const userDomain = new UserDomain();
        userDomain.getallUsers(req,res);
    }

    //GET AN USER
    static async getanUser(req,res)
    {
        const userDomain = new UserDomain();
        userDomain.getanUser(req,res);
    }

    //LOGIN
    static async loginUser(req, res) 
    {
    const userDomain = new UserDomain();
    userDomain.loginUser(req, res);
    }

     //USER DASHBOARD
     static async getAnUserDetails(req, res) 
     {
         const userDomain = new UserDomain();
         userDomain.getAnUserDetails(req, res);
     }

      //LOST PASSWORD
      static async lostPassword(req, res)
      {
          const userDomain = new UserDomain();
          userDomain.lostPassword(req, res);
      }



}


Userrouter.post("/register",UserController.registeranUser);
Userrouter.post("/login",UserController.loginUser);
Userrouter.get("/getalluser",UserController.getallUsers);
Userrouter.get("/getanuser/:id",verifytokens,authorizeRoles(true),UserController.getanUser);
Userrouter.get("/details",UserController.getAnUserDetails);
Userrouter.post("/lost-password",UserController.lostPassword);

module.exports = Userrouter;
