const express = require("express");
const router = express.Router();

const favesController = require("../controllers/favesController");
const userController = require("../controllers/userController");
const cookieController = require('../controllers/cookieController');

router.get("/user", favesController.getFaves, (req, res, next) => {
  console.log("Router preparing to fetch user's saved plants");
  res.send(200).json(res.locals.faves);
});


router.post("/new", userController.createUser, cookieController.createCookie, cookieController.clearSessions, cookieController.startSession, (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log(req.body)
  res.status(200).send("signed up");
});

router.post("/login", userController.verifyUser, cookieController.createCookie, cookieController.clearSessions, cookieController.startSession, favesController.getFaves, (req, res) => {
  // error handler
  // handle if username is already taken
  // upon successful signup do the following:
  console.log(req.body)
  const { verification, favorites } = res.locals
  res.status(200).json({verification: verification, favorites: favorites});
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
    res.status(200).send(res.locals.favorites);
    console.log("Saved fave!");
  }
);

router.post("/editFaves",
  favesController.deleteFav,
  favesController.getFaves,
  (req, res) => {
    console.log("Attempting to save selection");
    res.status(200).send(res.locals.favorites);
    console.log("Saved fave!");
  })



module.exports = router;
