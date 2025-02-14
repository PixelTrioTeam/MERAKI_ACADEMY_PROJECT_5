const pool = require("../models/db");

const likeMovieOrSeries = (req, res) => {
  const { movie_id, series_id, like_status } = req.body;
  const user_id = req.token.userId;

  if (movie_id) {
    const updateQuery = `
        UPDATE likes
        SET like_status = $1
        WHERE user_id = $2 AND movie_id = $3;
      `;

    const insertQuery = `
        INSERT INTO likes (user_id, movie_id, like_status)
        SELECT $1, $2, $3
        WHERE NOT EXISTS (
          SELECT 1 FROM likes WHERE user_id = $1 AND movie_id = $2
        );
      `;

    pool
      .query(updateQuery, [like_status, user_id, movie_id])
      .then(() => {
        return pool.query(insertQuery, [user_id, movie_id, like_status]);
      })
      .then(() => {
        res.status(200).json({
          success: true,
          message: `Movie like status updated `,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Error updating like status",
          error: err.message,
        });
      });
  } else if (series_id) {
    const updateQuery = `
        UPDATE likes
        SET like_status = $1
        WHERE user_id = $2 AND series_id = $3;
      `;

    const insertQuery = `
        INSERT INTO likes (user_id, series_id, like_status)
        SELECT $1, $2, $3
        WHERE NOT EXISTS (
          SELECT 1 FROM likes WHERE user_id = $1 AND series_id = $2
        );
      `;

    pool
      .query(updateQuery, [like_status, user_id, series_id])
      .then(() => {
        return pool.query(insertQuery, [user_id, series_id, like_status]);
      })
      .then(() => {
        res.status(200).json({
          success: true,
          message: `Series like status updated`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Error updating like status",
          error: err.message,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "SERVER ERROR ",
    });
  }
};

const unlikeMovieOrSeries = (req, res) => {
  const { movie_id, series_id } = req.body;
  const user_id = req.token.userId;

  if (movie_id) {
    pool
      .query(
        `
          UPDATE likes
          SET like_status = 0
          WHERE user_id = $1 AND movie_id = $2;
        `,
        [user_id, movie_id]
      )
      .then(() => {
        res.status(200).json({
          success: true,
          message: `Movie like status updated to unlike`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Error updating like status",
          error: err.message,
        });
      });
  } else if (series_id) {
    pool
      .query(
        `
          UPDATE likes
          SET like_status = 0
          WHERE user_id = $1 AND series_id = $2;
        `,
        [user_id, series_id]
      )
      .then(() => {
        res.status(200).json({
          success: true,
          message: `Series like status updated to unlike`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Error updating like status",
          error: err.message,
        });
      });
  }
};

module.exports = { likeMovieOrSeries, unlikeMovieOrSeries };
