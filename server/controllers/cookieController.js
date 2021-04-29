const cookieParser = require("cookie-parser");
const db = require("../models/plantModel");

const cookieController = {};

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

cookieController.clearSessions = (req, res, next) => {

  const queryString = 'DELETE FROM sessions WHERE expiresat < CURRENT_TIMESTAMP'
  
  db.
    query(queryString)
    .then(()=>{
      next();
    });
}

module.exports = cookieController;
