const express = require("express");
const movieRouter = express.Router();
const {
  addMovie,
  getMovies,
  deleteMovieById,
  getMovieByActorId,
  getMoviesByDirectorId,
  getMoviesByWriterId,
  getMovieById,
  getMovieByGenreId


} = require("../controllers/movie");


// http://localhost:5000/movie/addMovie
movieRouter.post("/addMovie", addMovie);

// http://localhost:5000/movie
movieRouter.get("/", getMovies);

movieRouter.get("/actor/:id", getMovieByActorId);
movieRouter.get("/director/:id", getMoviesByDirectorId);
movieRouter.get("/writer/:id", getMoviesByWriterId);

//http://localhost:5000/movie/$id
movieRouter.put("/:id", deleteMovieById);
movieRouter.get("/:id", getMovieById);
movieRouter.get("/genre/:id", getMovieByGenreId);



module.exports = movieRouter;
