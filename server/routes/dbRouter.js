const express = require("express");
const router = express.Router();

const favesController = require("../controllers/favesController");
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");



//main route for the userAuth route handler.
// const welcomeToUserAuth = 'Welcome To User Authentication\nFeel free to customize the main route as needed';
// userAuthRouter.get('/', (req,res) => {
//   return res.status(200).send(welcomeToUserAuth);
// })



//  THIS SHOULD BE FOR SIGN-UP
router.post("/signup", 
  userController.verifyExisting, 
  userController.encryptPswd,
  cookieController.setSSIDCookie,
  (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log("Attempting to create user");
  res.status(200).json({message: 'successful'});
  console.log("User successfully registered!");
});


//  >>  UPDATE LOGIN WHEN WE HAVE USER DB SET  <<
router.post("/login",
  userController.verifyUser,
  cookieController.createSessionCookie,
  (req, res) => {
    res.status(200).json(res.locals);
  });
    
  
  
router.get(
  "/user", 
  favesController.getFaves, 
  (req, res, next) => {
    console.log("Router preparing to fetch user's saved plants");
    res.send(200).json(res.locals.faves);}
);



//what does the req body for favorites look like?
// what should this endpoint be?
router.post(
  "/faves",
  favesController.addPlant,
  favesController.addFave,
  (req, res) => {
    console.log("Attempting to save selection");
    // what goes in the response?
    res.send(200).json(res.locals);
    console.log("Saved fave!");
  }
);



module.exports = router;
