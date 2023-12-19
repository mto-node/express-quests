const express = require("express");
const app = express();

app.use(express.json()); // add this line

const userControllers  = require("./controllers/userControllers");
const movieControllers = require("./controllers/movieControllers");

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", userControllers.postUser);
app.put("/api/users/:id", userControllers.putUser);
app.delete("/api/users/:id", userControllers.deleteUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.putMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

module.exports = app;
