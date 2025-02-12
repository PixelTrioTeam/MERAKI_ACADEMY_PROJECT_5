// require express to create router
const express = require("express");

// import funcitons



const { register, login, getUsers,getUserById,deleteUserById,loginGoogle } = require("../controllers/user");


// declare router
const userRouter = express.Router();

// declare end point to login and register user
// url => http://localhost:5000/user/register
userRouter.post("/register", register);

// url => http://localhost:5000/user/login
userRouter.post("/login", login);

// login with google url => http://localhost:5000/user/loginGoogle
userRouter.post("/loginGoogle", loginGoogle);






// url => http://localhost:5000/user/
userRouter.get("/", getUsers);

// url => http://localhost:5000/user/:userId
userRouter.get("/:userId",getUserById)

// url => http://localhost:5000/user/:userId
userRouter.delete("/:userId",deleteUserById)





module.exports = userRouter;
