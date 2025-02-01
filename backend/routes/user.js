// require express to create router
const express = require("express");

// import funcitons
const { register, login } = require("../controllers/user");

// declare router
const userRouter = express.Router();

// declare end point to login and register user
// url => http://localhost:5000/user/register
userRouter.post("/register", register);

// url => http://localhost:5000/user/login
userRouter.post("/login", login);
module.exports = userRouter;
