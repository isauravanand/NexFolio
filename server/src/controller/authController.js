const userModel = require("../models/users");


//Register Route
async function registerUser(req,res) {
    res.send("hello world"); 
}

async function loginUser(req,res) {
    res.send("Hi");
}

module.exports={
    registerUser,
    loginUser,
}