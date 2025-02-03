const express = require("express");

const {
  addToFavorit,
  removeFromFavorite,
  getFavorite,
} = require("../controllers/favorite");

const FavoriteRouter = express.Router();

const authentication = require("../middlewares/authentication");

FavoriteRouter.post("/add", authentication, addToFavorit);
FavoriteRouter.post("/remove", authentication, removeFromFavorite);

// get all favorite list
FavoriteRouter.get("/", authentication, getFavorite);

module.exports = FavoriteRouter;
