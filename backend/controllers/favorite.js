const pool = require('../models/db')


const addToFavorit = (req, res) => {
    const user_id = req.token.userId; 
    const { movie_id, series_id } = req.body;

    if (!user_id) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    if ((!movie_id && !series_id) || (movie_id && series_id)) {
        return res.status(400).json({ success: false, message: "Provide either a movie_id or a series_id, not both" });
    }

    const query = `INSERT INTO favorites (user_id, movie_id, series_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [user_id, movie_id || null, series_id || null];

    pool.query(query, values)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Added to favorites successfully",
                favorite: result.rows[0],
            });
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: "Database error", error: err.message });
        });
};

module.exports = {addToFavorit}
