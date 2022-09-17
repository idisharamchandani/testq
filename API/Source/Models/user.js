const mongoose = require("mongoose");
const Joi = require('joi');
const validator = require("validator");
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Standard: { type: Number, required: true },
    Country: { type: String },
    StreetAddress: { type: String },
    Town_City: { type: String, required: true },
    State: { type: String },
    PinCode: { type: Number, required: true },
    Phone: { type: Number, required: true },
    Email: {
        type: String, required: true, unique: [true,],
        validate(value) {
            console.log(value,"value")
            if (!validator.isEmail(value)) {

                throw new Error("Invalid email address")

            }
        }
    },
    Password: { type: String, required: true },

    isAdmin: { type: Boolean , default:false }



},
    {
        timestamps: true
    });




// REGISTER
UserSchema.pre("save", async function (next) {

    if (this.isModified("Password")) {
        this.Password = await bcrypt.hash(this.Password, 10);
    }
    next();

});

//LOGIN

UserSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.Password);
}

// function validateUser(user) {
//     const schema =
//     {
//         FirstName: Joi.string().min(2).max(50).required(),
//         LastName: Joi.string().min(5).max(50).required(),
//         Standard: Joi.number().required(),
//         Country: Joi.string().min(5).max(50).required(),
//         StreetAddress: Joi.string().min(5).max(50).required(),
//         Town_City: Joi.string().min(5).max(50).required(),
//         State: Joi.string().min(5).max(50).required(),
//         PinCode: Joi.number().integer().max(10).required(),
//         Phone: Joi.number().integer().max(10).required(),
//         Email: Joi.string().email().trim(true).required(),
//         Password: Joi.string().min(8).trim(true).required(),
//         isAdmin: Joi.boolean()
//     };

//     return Joi.validate(user, schema);
// }



const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
// exports.validate = validateUser;