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

    pool.query(query).then((result)=>{
        res.status(201).json({
            success : true,
            message : 'the movie added successfully',
            result : result
        })
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : 'error while adding the movie',
            error : err.message
        })
    })
};

module.exports = {addMovie}
