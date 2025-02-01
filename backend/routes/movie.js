const express = require('express')
const movieRouter = express.Router()
const {addMovie , getMovies} = require('../controllers/movie')


movieRouter.post('/addMovie' , addMovie)
movieRouter.get('/' , getMovies)


module.exports = movieRouter