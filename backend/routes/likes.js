const express = require("express");

const { likeMovieOrSeries } = require("../controllers/like");

const likeRouter = express.Router();

likeRouter.post("/addlike", likeMovieOrSeries);

module.exports = likeRouter;
