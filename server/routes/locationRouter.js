const { Router } = require("express");

Router.get('/:locName', locationController.familyNames, (req, res, next) => {
   res.send(200).json(res.locals.families);
   return next();
})

Router.get('/:locName/:famName', locationController.familyNames, (req, res, next) => {
    res.send(200).json(res.locals.families);
    return next();
 })

 Router.get('/:locName/:famName/:plantName', locationController.familyNames, (req, res, next) => {
    res.send(200).json(res.locals.families);
    return next();
 })