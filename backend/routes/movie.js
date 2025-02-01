const express = require("express");
const movieRouter = express.Router();
const {
  addMovie,
  getMovies,
  deleteMovieById,
} = require("../controllers/movie");


// http://localhost:5000/movie/addMovie
movieRouter.post("/addMovie", addMovie);

// http://localhost:5000/movie
movieRouter.get("/", getMovies);

//http://localhost:5000/movie/$id
movieRouter.put("/:id", deleteMovieById);

module.exports = movieRouter;
