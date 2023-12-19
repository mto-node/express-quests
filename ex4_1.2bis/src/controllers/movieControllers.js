const movies = [/* ... */];

const database = require("../../database");

// const getMovies = (req, res) => {
//   database
//     .query("select * from movies")
//     .then(([movies]) => {
//       res.json(movies); // use res.json instead of console.log
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];
  console.log(req.query)

  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
  }
  if (req.query.max_duration != null) {
    sql += " where duration <= ?";
    sqlValues.push(req.query.max_duration);
  }

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  // const movie = movies.find((movie) => movie.id === id);
  database 
  // .query(`select * from movies where id = ${id}`)
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      let movie = movies[0]
      if(movie)
        res.status(200).json(movie)
      else
        res.status(404).json('Not Found')
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
};

