const cookieParser = require("cookie-parser");
const db = require("../models/plantModel");

const cookieController = {};

cookieController.createCookie = (req, res, next) => {
   const { username } = req.body;
   console.log('in createCookie')
   console.log(res.locals.verification)
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

cookieController.startSession = async (req, res, next) => {
  console.log('in the body in start session')
  console.log(req.body)
  const { rtgssid } = res.locals;
  const createSessionQuery = {
    text: 'INSERT INTO sessions (cookieid, userid) VALUES ($1, $1)',
    values: [rtgssid],
    rowMode: 'array'
  }

  const userQueryString = {
    text : 'SELECT _id from users WHERE users.username = $1',
    values : [req.body.username],
    rowMode : 'array'
  }

  const session_result = await db.query(createSessionQuery)
  console.log('started session...')
  const user_result = await db.query(userQueryString);
 
  res.locals.user_id = user_result.rows[0][0];
  next();

}

cookieController.clearSessions = (req, res, next) => {

  const queryString = 'DELETE FROM sessions WHERE expiresat < CURRENT_TIMESTAMP'
  
  db.
    query(queryString)
    .then(()=>{
      console.log('in clearsession')
      console.log(res.locals.verification)
      next();
    });
}

module.exports = cookieController;
