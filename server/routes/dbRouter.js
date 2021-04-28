const express = require("express");
const router = express.Router();

const favesController = require("../controllers/favesController");
const userController = require("../controllers/userController");
const cookieController = require('../controllers/cookieController');

router.get("/user", favesController.getFaves, (req, res, next) => {
  console.log("Router preparing to fetch user's saved plants");
  res.send(200).json(res.locals.faves);
});

/*
router.post("/login", (req, res) => {
  // error handler
  // user not found handler -- login credentials not valid
  // upon verification do the following:
  // use "bcrypt compare" to verify that the username/password on the req body match
  res.status(200).redirect("/user");
  console.log("User verified");
});
*/

router.post("/new", userController.createUser, cookieController.createCookie, cookieController.clearSessions, cookieController.startSession, (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log(req.body)
  console.log("Attempting to create user");
  res.status(200).send("signed up");
  console.log("User successfully signed in!");
});

router.post("/login", userController.verifyUser, cookieController.createCookie, cookieController.clearSessions, cookieController.startSession, (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log(req.body)
  res.status(200).send(res.locals.verification);
  console.log("Check response for login status!");
});

//what does the req body for favorites look like?
// what should this endpoint be?

router.post(
  "/faves",
  favesController.addPlant,
  favesController.addFave,
  favesController.getFaves,
  (req, res) => {
    console.log("Attempting to save selection");
    // what goes in the response?
    res.sendStatus(200).json(res.locals.favorites);
    console.log("Saved fave!");
  }
);



module.exports = router;
