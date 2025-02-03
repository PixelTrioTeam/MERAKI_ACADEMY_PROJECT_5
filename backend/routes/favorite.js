const express = require('express')

const {addToFavorit} = require('../controllers/favorite')

const FavoriteRouter = express.Router()

const authentication = require('../middlewares/authentication')

FavoriteRouter.post('/add' ,authentication, addToFavorit)

module.exports = FavoriteRouter