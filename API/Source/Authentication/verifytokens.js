const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");
// const asyncHandler = require("express-async-handler");

exports.verifytokens = async(req,res,next) => {
    let token
    console.log(req.headers)
    // console.log(req.headers.x-access-token)
    console.log(req.headers.authorization)

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    
    {
        // console.log("token Found");

        try
        {
            token = req.headers.authorization.split(" ")[1];
            console.log(token)

            const decoded = jwt.verify(token,"QUIZ")
            console.log(decoded,"uuser")
            

            req.user = await UserModel.findById(decoded._id).select("-Password")
            console.log(req.user,"user")
            next();

        }catch(error)
        {
            console.error(error);
            res.status(401)
            throw new Error ("Not authorized,token failed");
        }
    }
    if(!token)
    {
        res.status(401);
        throw new Error("Not authorized , no token")
    }
};

exports.authorizeRoles = (...typeIds) => {
    console.log("dddd",typeIds)
return (req, res, next) => {
    console.log(req.user.isAdmin,"ADMIN")
if (!typeIds.includes(req.user.isAdmin)) {
return next(
    // console.log("rejected");
    res.send("User Not Allowed")
);
}
next();
};
};


// module.exports = verifytokens;