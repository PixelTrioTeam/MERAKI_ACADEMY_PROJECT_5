const express = require("express");
const {
  addSeries,
  getSeries,
  getSeriesById,
  deleteSeriesById,
} = require("../controllers/series");
const SeriesRouter = express.Router();

SeriesRouter.post("/addSeries", addSeries);
SeriesRouter.get("/", getSeries);
SeriesRouter.get("/:id", getSeriesById);
// SeriesRouter.put("/delete/:id", deleteSeriesById);

module.exports = SeriesRouter;
