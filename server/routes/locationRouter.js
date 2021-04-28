const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');

const favesController = require("../controllers/favesController");
const userController = require("../controllers/userController");


// fires when clicking on a US state
// sends get request to Trefle API to fetch array of plant family names
router.get('/:locName', locationController.familyNames, (req, res, next) => {
   console.log('Router preparing to fetch plant family names')
   res.status(200).send(res.locals.families);
})


router.get('/:locName/:famName', locationController.getPlants, (req, res, next) => {
    res.status(200).send(res.locals.plants);
 })
 
 router.get('/:locName/:famName/:plantName', locationController.getDetails, (req, res, next) => {
    res.status(200).send(res.locals.plantInfo);
 })

//  router.post("/signup", userController.createUser, (req, res) => {
//    // error handler
//    // handle if username is already taken
//    // upon successful signup do the following:
//    console.log(req.body);
//    console.log("Attempting to create user");
//    res.status(200).send("signed up");
//    console.log("User successfully signed in!");
//  });

 module.exports = router;