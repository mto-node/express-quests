const users = [];
const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
