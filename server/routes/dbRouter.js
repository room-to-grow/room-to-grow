const express = require("express");
const router = express.Router();

const favesController = require("../controllers/favesController");
const userController = require("../controllers/userController");

router.get("/", favesController.getFaves, (req, res, next) => {
  console.log("Router preparing to fetch user's saved plants");
  res.send(200).json(res.locals.faves);
});


router.post("/", favesController.addPlant, favesController.addFave, favesController.getFaves, (req, res, next) => {
  console.log('adding fave');
  res.send(200).json(res.locals.faves);
})

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

router.post("/", userController.createUser, (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log("Attempting to create user");
  res.status(200).send("signed up");
  console.log("User successfully signed in!");
});

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