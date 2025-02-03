const pool = require("../models/db");

const addToFavorit = (req, res) => {
  const user_id = req.token.userId;
  const { movie_id, series_id } = req.body;

  if (!user_id) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }

  if ((!movie_id && !series_id) || (movie_id && series_id)) {
    return res.status(400).json({
      success: false,
      message: "Provide either a movie_id or a series_id, not both",
    });
  }

  const query = `INSERT INTO favorites (user_id, movie_id, series_id) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user_id, movie_id || null, series_id || null];

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Added to favorites successfully",
        favorite: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    });
};

const removeFromFavorite = (req, res) => {
  const user_id = req.token.userId;
  const { movie_id, series_id } = req.body;

  if (!movie_id && !series_id) {
    return res.status(400).json({
      success: false,
      message: "Provide either a movie_id or a series_id",
    });
  }

  const query = `DELETE FROM favorites WHERE user_id = $1 AND (movie_id = $2 OR series_id = $3) RETURNING *`;
  const values = [user_id, movie_id || null, series_id || null];

  pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Favorite not found" });
      }
      res.status(200).json({
        success: true,
        message: "Removed from favorites successfully",
        favorite: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    });
};

const getFavorite = (req, res) => {
  const user_id = req.token.userId;
  if (!user_id) {
    return res
      .status(401)
      .json({ success: false, message: "Please login to see your list" });
  }

  const query = `SELECT 
    favorites.*, 
    movies.title AS movie_name, 
    movies.description AS movie_info, 
    movies.poster AS movie_img,
    series.title AS series_name,
    series.description AS series_info,
    series.poster AS series_img
FROM favorites
LEFT JOIN movies ON favorites.movie_id = movies.id
LEFT JOIN series ON favorites.series_id = series.id
WHERE favorites.user_id = $1;
`;
  pool
    .query(query, [user_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(200).json({
          success: true,
          message: "Your favorite list is empty",
          result: [],
        });
      }
      res.status(200).json({
        success: true,
        message: `The favorite list for user with id: ${user_id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    });
};

module.exports = { addToFavorit, removeFromFavorite, getFavorite };
