/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

const locationController = require('../controllers/locationController');

// fires when clicking on a US state
// sends get request to Trefle API to fetch array of plant family names
router.get('/:locName', locationController.familyNames, (req, res, next) => {
  console.log('Router preparing to fetch plant family names');
  res.status(200).send(res.locals.families);
});

router.get('/:locName/:famName', locationController.getPlants, (req, res, next) => {
  res.status(200).send(res.locals.plants);
});

router.get('/:locName/:famName/:plantName', locationController.getDetails, (req, res, next) => {
  res.status(200).send(res.locals.plantInfo);
});

module.exports = router;
