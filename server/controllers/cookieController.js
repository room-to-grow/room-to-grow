const bcrypt = require("bcrypt");
const db = require("../models/plantModel");
const saltRounds = 10;


const cookieController = {};




cookieController.setSSIDCookie = (req,res,next) => {
  // console.log('********* COOKIE CONTROLLER START *********')
  // console.log(req.body)
  res.cookie('ssid', req.body.password, {httpOnly: false, maxAge: 1000000})
  // console.log(res.cookies)
  // console.log('********* COOKIE CONTROLLER END *********')
  return next();
}

cookieController.createSessionCookie = (req,res,next) => {
  console.log('********* COOKIE CONTROLLER START *********')
  // console.log(req.body)
  const { username } = req.body;
  
  const newSSID = () => {
    const SSID = Math.floor(Math.random() * 100000000000000);
    db.query(`SELECT ssid FROM sessions`)
      .then(data => {
        console.log(data.rows);
        if (!data.rows.length) return SSID;
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

    const queryString = `INSERT INTO sessions
    VALUES ($1, $2)`;
    const addChar = [res.locals.ssid, username];
    
    db.query(queryString, addChar)
      .then(() => next())
      .catch(err => console.log('MAJOR PROBLEM TRYING TO ADD INTO SESSIONS DB: ', err))
  }

  newSSID();
}

cookieController.sessionValidation = (req, res, next) => {
  
  db.query(
    `SELECT ssid FROM sessions WHERE ssid = hashUsername `
  )
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