const express = require("express");
const {
  addSeries,
  getSeries,
  getSeriesById,
} = require("../controllers/series");
const SeriesRouter = express.Router();

SeriesRouter.post("/addSeries", addSeries);
SeriesRouter.get("/", getSeries);
SeriesRouter.get("/:id", getSeriesById);


module.exports = SeriesRouter;
