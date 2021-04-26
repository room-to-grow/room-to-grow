const db = require('../models/plantModel');

const favesController = {};

favesController.getFaves = (req, res, next) => {
    const queryString = 'SELECT faves.* FROM faves';
    const userFaves = db.query(queryString);
    userFaves
        .then((data) => (res.locals.faves = data.rows))
        .then(console.log('fetching user\'s favorite plants NOW!'))
        .then(() => next());
}


// do we want a controller to retrieve the user's notes?



module.exports = favesController;