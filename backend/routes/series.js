const express = require("express");
const {
  addSeries,
  getSeries,
  getSeriesById,
  deleteSeriesById,
} = require("../controllers/series");
const SeriesRouter = express.Router();

SeriesRouter.post("/addSeries", addSeries);
//http://localhost:5000/series
SeriesRouter.get("/", getSeries);


// http://localhost:5000/series/$id
SeriesRouter.get("/:id", getSeriesById);

//http://localhost:5000/series/delete/$id
SeriesRouter.put("/delete/:id", deleteSeriesById);

module.exports = SeriesRouter;
