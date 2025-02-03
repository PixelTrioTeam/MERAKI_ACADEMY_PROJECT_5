const express = require('express')

const {addToFavorit , removeFromFavorite} = require('../controllers/favorite')

const FavoriteRouter = express.Router()

const authentication = require('../middlewares/authentication')

FavoriteRouter.post('/add' ,authentication, addToFavorit)
FavoriteRouter.post('/remove' ,authentication, removeFromFavorite)


module.exports = FavoriteRouter