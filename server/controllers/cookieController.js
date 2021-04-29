const bcrypt = require("bcrypt");
const db = require("../models/plantModel");
const saltRounds = 10;


const cookieController = {};

cookieController.createSessionCookie = (req,res,next) => {
  console.log('********* COOKIE CONTROLLER START *********')
  // console.log(req.body)
  const { username } = req.body;
  
  const newSSID = () => {
    const SSID = Math.floor(Math.random() * 1000000000000);
    db.query(`SELECT ssid FROM sessions`)
      .then(data => {
        console.log(data.rows);
        for (let session of data.rows) {
          if (session.ssid === SSID) return newSSID();
        }
        console.log(SSID);
        setCookie(SSID);
      })
  }

  const setCookie = (SSID) => {
    res.locals.ssid = SSID;
    
    res.cookie('ssid', SSID, {httpOnly: false, maxAge: 1000000})
    
    const query = {
      text: 'INSERT INTO sessions(ssid, username) VALUES ($1, $2)',
      values: [SSID, username]
    }

    //const queryString = 'INSERT INTO sessions (ssid, username) VALUES ($1, $2)';
    
    // server is running on 8080, if you want to test

    db.query(query)
      .then(() => next())
      .catch(err => console.log('MAJOR PROBLEM TRYING TO ADD INTO SESSIONS DB: ', err))
  }

  newSSID();
}

cookieController.sessionValidation = (req, res, next) => {
  console.log('entered verifySession')
  if (!req.cookies.ssid) return res.status(200).json({message: 'noSession'})
  
  //check in session db is cookie is valid
  //if query doesn't exist

  const query = {
    text: `SELECT ssid FROM sessions WHERE ssid = ${req.cookies.ssid}`,
  }

  console.log('checking for session in db');
  db.query(query)
  .then(data => {
    if (!data.rows.length) return res.status(200).json({message: 'noSession'})
    res.locals.ssid = req.cookies.ssid;
    return next();
  })


}

cookieController.getUserFromSSID = (req,res,next) => {
  
  const query = {
    text: `SELECT username FROM sessions WHERE ssid = ${req.params.ssid}`
  }
  db.query(query)
  .then(data => {
    if (!data.rows.length) return res.status(200).json({message: 'invalid ssid'})
    res.locals.username = data.rows[0].username;
    return next();
  })


}



// cookieController.sessionHandler = (req, res, next) => {
//     // extracting the user id from the session
//     let userCookie  = getUserId(req, res);

//     //if no userId, create a new one
//     if (!userCookie || !cookieController[userCookie]) {
//         userId = (/*cookie creator we already have*/)
//     }
// }



module.exports = cookieController;