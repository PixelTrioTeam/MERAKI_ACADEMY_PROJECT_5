const express = require('express')
const movieRouter = express.Router()
const {addMovie} = require('../controllers/movie')


movieRouter.post('/addMovie' , addMovie)

module.exports = movieRouter