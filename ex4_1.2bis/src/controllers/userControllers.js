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

  // for(let key in query) {
  //   if (query.hasOwnProperty(key)) {
  //     sql += ` ${key} = ?`;
  //     sqlValues.push(query[key]);
  //     console.log(` ${key} = ${query[key]}`)
  //   }
  // }

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

module.exports = {
  getUsers,
  getUserById,
};

