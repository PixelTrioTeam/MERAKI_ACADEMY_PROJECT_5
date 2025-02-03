const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  likeMovieOrSeries,
  unlikeMovieOrSeries,
} = require("../controllers/like");

const likeRouter = express.Router();

likeRouter.post("/addlike", authentication, likeMovieOrSeries);
likeRouter.post("/unlike", authentication, unlikeMovieOrSeries);

module.exports = likeRouter;
