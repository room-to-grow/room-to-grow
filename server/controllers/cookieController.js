const cookieController = {};



cookieController.setSSIDCookie = (req,res,next) => {
  console.log('********* COOKIE CONTROLLER START *********')
  console.log('********* GO INTO COOKIE-CONTROLLER AND UPDATE WITH USER-INFO *********')
  // console.log(req.body)

  //  >>  UPDATE WHEN WE HAVE REQ.BODY.PASSWORD  <<
  // res.cookie('ssid', req.body.username, {httpOnly: false, maxAge: 1000000})

  // console.log(res.cookies)
  // console.log('********* COOKIE CONTROLLER END *********')
  return next();
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