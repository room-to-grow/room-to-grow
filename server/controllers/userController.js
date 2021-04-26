const bcrypt = require("bcrypt");

const saltRounds = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash =
    (password,
    saltRounds,
    (err, hash) => {
      const queryString = `INSERT INTO public.users VALUES (username, hash) WHERE NOT EXISTS (SELECT user_id FROM public.users WHERE public.users.user_id = username)`;
      db.query(queryString);
    });
  // ??????????????
  bcrypt.hash.then(() => next());
};

//tbd endpoint
userController.post =
  ("/login",
  (req, res) => {
    bcrypt.hash =
      (req.body.password,
      saltRounds,
      (err, hash) => {
        db.users.create({
          username: req.body.username,
          password: hash,
        });
      });
  });
