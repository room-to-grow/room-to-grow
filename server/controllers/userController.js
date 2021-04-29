const bcrypt = require("bcrypt");
const db = require("../models/plantModel");
const saltRounds = 10;

const userController = {};


//  >>  OLD FORMAT FROM ROOM TO GROW  <<
userController.verifyExisting = (req, res, next) => {
  const { username, password } = req.body;
  console.log("username: ", username);
  //can also do a WHERE check and if rows.length <1
  const queryStringCheck = `SELECT username FROM users`;
  db.query(queryStringCheck)
    .then((response) => response.rows)
    .then(rows => {
      for (let user of rows) {
        if (user.username===username) {
          return res.status(200).json({message: 'usernameInUse'});
        }
      }
      return next();
    })
    .catch(err => console.log('Problem verifying user! ERROR: ', err))
};


userController.encryptPswd = (req, res, next) => {
  const { username, password } = req.body;
  // console.log("Made it to encryption")
  
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const values = [username, hash];
    console.log(values);
    const queryString = 
    `INSERT INTO users(username, password)
    VALUES ('${username}', '${hash}')`;
  
    db.query(queryString, [username, hash])
      .then(() => console.log("=================== Account Creation Successful ======================"))
      .then(() => next())
      .catch(err => next({
        log: err,
        err: '================== userController.encryptPswd failed to add to database ====================='
      })); 
    })

};



// //  >>  LOGIN CONTROLLER  <<
userController.verifyUser = (req, res, next) => {
  console.log('test login pass, entered verifyUser')
  const { username, password } = req.body;
  console.log("username: ", username);
  //can also do a WHERE check and if rows.length <1
  const queryStringCheck = `SELECT username, password FROM users`;
  db.query(queryStringCheck)
    .then((response) => response.rows)
    .then(rows => {
      console.log("=========================", 'got data, now verifying user', "===========================");

      let verifiedName = null;
      for (let user of rows) {
        if (user.username===username) {
          verifiedName = user;
          break;
        }
      }
      if (!verifiedName) return res.status(200).json({message: 'usernameNoMatch'});
      //recrypt password
      console.log(verifiedName)

      bcrypt.compare(req.body.password, verifiedName.password, (err, isMatch) => {
        if (err) console.log('========================= Error in bcrypt hashing, verifyUser: ', err, "=============================")
        if (!isMatch) return res.status(200).json({message: 'passwordNoMatch'});
        console.log('password correct!')
        return next();
      })
    })
    .catch(err => console.log('Problem verifying user! ERROR: ', err))
}



userController.logout = (req, res, next) => {
  console.log('Logging user out...')
  db.query(`DELETE FROM sessions WHERE ssid=${req.params.ssid}`)
  .then(() => {
    console.log('User logged out!')
    return next()
  });
}

module.exports = userController;
