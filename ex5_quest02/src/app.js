const express = require("express");
const app = express();

app.use(express.json()); // add this line

const userControllers  = require("./controllers/userControllers");
const movieControllers = require("./controllers/movieControllers");

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", userControllers.postUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);

module.exports = app;
