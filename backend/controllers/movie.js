const pool = require("../models/db");

const addMovie = (req, res) => {
  const {
    title,
    description,
    genre,
    trailer,
    poster,
    rate,
    actors,
    director,
    writers,
    created_at,
  } = req.body;
  const query = `insert into movies (title,
    description,
    genre,
    trailer,
    poster,
    rate,
    actors,
    director,
    writers,
    created_at) Values ('${title}','${description}','${genre}','${trailer}','${poster}','${rate}','${actors}','${director}','${writers}','${created_at}') RETURNING *`;

  pool
    .query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "the movie added successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "error while adding the movie",
        error: err.message,
      });
    });
};

const getMovies = (req, res) => {
  const query = `select * from movies WHERE is_deleted=0`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "getting all movies",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "failed to get movies",
        error: err.message,
      });
    });
};

const deleteMovieById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE movies SET is_deleted = 1 WHERE id= $1;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Movie with id: ${id}  deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting movie");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

module.exports = { addMovie, getMovies, deleteMovieById };
