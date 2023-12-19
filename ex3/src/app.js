const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");

app.get("/api/users", movieControllers.getMovies);
app.get("/api/users/:id", movieControllers.getMovieById);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

module.exports = app;
