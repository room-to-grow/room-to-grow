const bcrypt = require("bcrypt");
const db = require("../models/plantModel");
const saltRounds = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log("username: ", username);
  console.log("password: ", password);
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

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const findQuery = {
    text: 'SELECT username, password FROM users where username = $1',
    values: [username],
    rowMode: 'array'
  };

  db.
    query(findQuery)
    .then((user) => {
      // assigning the pw that is currently saved in DB to a constant
      const passwordFromDB = user.rows[0][1];
      return passwordFromDB;
    }).then((passwordFromDB) => {
      // comparing the pw that is currently saved in DB to the pw that was entered
      bcrypt.compare(password, passwordFromDB, (err, success) => {
        if(success) console.log('pw matches!');
        // res.locals.verification set to true/false based on compare results
        res.locals.verification = success;
        //next();
        //console.log('in verify user')
        //console.log(res.locals.verification)
        //need to add logic to exit out of the middleware if the password is incorrect - normally this is done with a redirect;
      });
    }).then((password) => next()); 

}


module.exports = userController;
