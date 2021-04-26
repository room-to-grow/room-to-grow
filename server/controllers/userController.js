const bcrypt = require("bcrypt");
const db = require("../models/plantModel");
const saltRounds = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log("username: ", username);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const values = [username, hash];
    console.log(values);

    const queryString = `
    INSERT INTO public.users(username, password)
    VALUES ('${username}', '${hash}')
    `;

    db.query(queryString, [username, hash])
      .then(() => console.log("Success in middleware!"))
      .then(() => next())
      .catch((err) => console.log("we're hitting it", err));
  });
};

//tbd endpoint
// userController.post =
//   ("/login",
//   (req, res) => {
//     bcrypt.hash =
//       (req.body.password,
//       saltRounds,
//       (err, hash) => {
//         db.users.create({
//           username: req.body.username,
//           password: hash,
//         });
//       });
//   });

module.exports = userController;
