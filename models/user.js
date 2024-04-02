const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phoneNo: { type: String, required: true },
	email: { type: String, required: true },
	linkedIn: { type: String, required: true },
	Bio: { type: String, required: true },
	resume: { type: String, required: true },
	password: { type: String, required: true },
	user_id: { type: Number, required: true},
	connection : [{
		user_id : {
		  type : Number
		},
		connected_at : {
		  type : Date
		}
	}]
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		phoneNo: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required().label("Phone No"),
		email: Joi.string().email().required().label("Email"),
		linkedIn: Joi.string().required().label("LinkedIn Link"),
		password: passwordComplexity().required().label("Password"),
		Bio: Joi.string().required().label("Bio"),
		resume: Joi.string().required().label("Resume Link"),
		user_id: Joi.string().length(8).required().label("user_id"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
