const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');

// fires when clicking on a US state
// sends get request to Trefle API to fetch array of plant family names
router.get('/:locName', locationController.familyNames, (req, res, next) => {
   console.log('Router preparing to fetch plant family names')
   res.send(200).json(res.locals.families);
   return next();
})

/*
********* FORMER GET REQUEST FOR FAMILY NAMES FROM SERVER.JS ****************
app.get('/location/:locName', (req,res)=>{
   const familyNames = Promise.resolve((fetchDistro(req.params.locName)))
     .then(data => res.json(data))})
 *****************************************************************************
*/

router.get('/:locName/:famName', locationController.familyNames, (req, res, next) => {
    res.send(200).json(res.locals.families);
    return next();
 })

 router.get('/:locName/:famName/:plantName', locationController.familyNames, (req, res, next) => {
    res.send(200).json(res.locals.families);
    return next();
 })