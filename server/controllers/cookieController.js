const cookieParser = require("cookie-parser");
const db = require("../models/plantModel");

const cookieController = {};

// cookieController.sessionHandler = (req, res, next) => {
//     // extracting the user id from the session
//     let userCookie  = getUserId(req, res);

//     //if no userId, create a new one
//     if (!userCookie || !cookieController[userCookie]) {
//         userId = (/*cookie creator we already have*/)
//     }
// }

cookieController.createCookie = (req, res, next) => {
   const { username } = req.body;
   const findUserQuery =  {
       text : 'SELECT _id FROM users WHERE users.username = $1',
       values : [username],
       rowMode : 'array'
   }

   db.
   query(findUserQuery)
   .then((result) => {
       res.cookie('rtgssid', result.rows[0][0], { httpOnly: true });
       res.locals.rtgssid = result.rows[0][0];
       next();
   })
}

cookieController.startSession = (req, res, next) => {
  const { rtgssid } = res.locals;
  console.log('res locals', rtgssid);
  const createSessionQuery = {
    text: 'INSERT INTO sessions (cookieid, userid) VALUES ($1, $1)',
    values: [rtgssid],
    rowMode: 'array'
  }
  
  db.
    query(createSessionQuery)
    .then((res) => {
      console.log('session created');
      next()
    });

}

module.exports = cookieController;
