const express = require("express");
const app = express();
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);
const path = require('path');
require("dotenv").config();

app.use(express.json()); // add this line
app.use(Session({
    // if(req.session.username === null) {
        store: new FileStore({
            path: path.join(__dirname, '/tmp'),
            encrypt: true
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        name : process.env.SESSION_NAME
    // }

}));

const userControllers  = require("./controllers/userControllers");
const movieControllers = require("./controllers/movieControllers");
const validateUser = require("./middlewares/validateUser");
const validateMovie = require("./middlewares/validateMovie");

app.get("/", (req, res) => {

});

app.get("/getSession", (req, res) => {
  // Set a session variable
  req.session.username = "exampleUser";
  req.session.song = "be bop a lula";
  res.send("Session variable set");
});

app.get("/setSession", (req, res) => {
  // Get a session variable
  const username = req.session.username;

  if (username) {
    res.send("Username: " + username + ' song: ' + req.session.song);
  } else {
    res.send("Session variable not set");
  }
});

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", validateUser, userControllers.postUser);
app.put("/api/users/:id", validateUser, userControllers.putUser);
app.delete("/api/users/:id", userControllers.deleteUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.putMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

module.exports = app;


// router.get("/", (req, res) => {
//   // Initialisation de la variable de sessions "maVariable" avec TRUE
// //   req.session.maVariable = true;
//     console.log('OK')
// });
