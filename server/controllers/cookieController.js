const cookieParser = require("cookie-parser");

const cookieController = {};

// cookieController.sessionHandler = (req, res, next) => {
//     // extracting the user id from the session
//     let userCookie  = getUserId(req, res);

//     //if no userId, create a new one
//     if (!userCookie || !cookieController[userCookie]) {
//         userId = (/*cookie creator we already have*/)
//     }
// }

module.exports = cookieController;
