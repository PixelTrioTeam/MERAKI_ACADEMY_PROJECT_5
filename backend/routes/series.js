const express = require("express");
const {
  addSeries,
  getSeries,
  getSeriesById,
  deleteSeriesById,
  getSeriesByActorId,
  getSeriesByDirectorId,
  getSeriesByWriterId,
} = require("../controllers/series");
const SeriesRouter = express.Router();
//http://localhost:5000/series/addSeries

SeriesRouter.post("/addSeries", addSeries);
//http://localhost:5000/series
SeriesRouter.get("/", getSeries);

// http://localhost:5000/series/$id
SeriesRouter.get("/:id", getSeriesById);

SeriesRouter.get("/actor/:id", getSeriesByActorId);
SeriesRouter.get("/director/:id", getSeriesByDirectorId);
SeriesRouter.get("/writer/:id", getSeriesByWriterId);

//http://localhost:5000/series/delete/$id
SeriesRouter.put("/delete/:id", deleteSeriesById);

module.exports = SeriesRouter;
