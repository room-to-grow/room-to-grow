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
router.post("/", 
  // userController.createUser, 
  (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log("Attempting to create user");
  res.status(200).send("signed up");
  console.log("User successfully signed in!");
});


//  >>  UPDATE LOGIN WHEN WE HAVE USER DB SET  <<
router.post(
  "/login", 
  // userController.logIn,
  // cookieController.setSSIDCookie,
  (req, res) => {
    // error handler
    // user not found handler -- login credentials not valid
    // upon verification do the following:
    // use "bcrypt compare" to verify that the username/password on the req body match
    res.status(200).redirect("/user");
    console.log("User verified");
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
/*
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


*/
module.exports = router;
