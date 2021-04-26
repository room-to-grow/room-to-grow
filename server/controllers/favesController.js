const db = require("../models/plantModel");

const favesController = {};

favesController.getFaves = (req, res, next) => {
  const queryString = "SELECT faves.* FROM faves";
  const userFaves = db.query(queryString);
  userFaves
    .then((data) => (res.locals.faves = data.rows))
    .then(console.log("fetching user's favorite plants NOW!"))
    .then(() => next());
};

favesController.addFave = (req, res, next) => {
  const { user_id, plant_id, notes } = req.body;
  const queryString = "INSERT INTO public.faves (user_id, plant_id, notes)";
  const newFave = db.query(queryString);
  newFave.then(() => next());
};

module.exports = favesController;
