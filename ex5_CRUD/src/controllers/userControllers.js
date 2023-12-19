const users = [];
const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "select * from users";
  let query = req.query
  const sqlValues = [];
  console.log(query)

  let keys = Object.keys(query);

  if(keys.length !== 0) {
    sql += " where";
  }

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];

    if (query.hasOwnProperty(key)) {
      sql += `${i === 0 ? '' : ' AND'} ${key} = ?`;
      sqlValues.push(query[key]);
      // console.log(` ${key} = ${query[key]}`)
    }
  }

  console.log(`sql query: ${sql}`)

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      console.log(users)
      if(users.length === 0) res.sendStatus(200)
      else res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      let user = users[0];
      if (user) res.status(200).json(user);
      else res.status(404).json("Not Found");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const postUser = (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, city, language } = req.body;
  // res.send("Post route is working 🎉");

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

const putUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
  console.log(req.body)

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser = (req, res) => {
  res.send('delete work')
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser
};

