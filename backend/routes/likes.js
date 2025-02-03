const express = require("express");

const {
  likeMovieOrSeries,
  unlikeMovieOrSeries,
} = require("../controllers/like");

const likeRouter = express.Router();

likeRouter.post("/addlike", likeMovieOrSeries);
likeRouter.post("/unlike", unlikeMovieOrSeries);

module.exports = likeRouter;
