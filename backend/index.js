const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
const SeriesRouter = require("./routes/series");
const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");
//routers

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());
 getMovieById
// <<<<<<< HEAD
app.use('/series' , SeriesRouter)
app.use('/movies' , movieRouter)
// =======
app.use("/series", SeriesRouter);
app.use("/movie", movieRouter);
app.use("/user", userRouter);


app.use("/series", SeriesRouter);
app.use("/movie", movieRouter);
app.use("/user", userRouter);

// router middleware

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
