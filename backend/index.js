const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
require("./models/soket");
const SeriesRouter = require("./routes/series");
const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");
const favoriteRouter = require("./routes/favorite");
const likeRouter = require("./routes/likes");
//routers

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

app.use("/series", SeriesRouter);
app.use("/movie", movieRouter);
app.use("/user", userRouter);
app.use("/favorite", favoriteRouter);
app.use("/like", likeRouter);

// router middleware

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

