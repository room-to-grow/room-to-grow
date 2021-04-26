const express = require('express');
const router = express.Router();

const favesController = require('../controllers/favesController');
const cookieController = require('../controllers/cookieController');

router.get('/user', favesController.getFaves, (req, res, next) => {
    console.log('Router preparing to fetch user\'s saved plants')
    res.send(200).json(res.locals.faves);
    return next();
 })