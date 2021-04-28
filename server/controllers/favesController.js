const db = require("../models/plantModel");

const favesController = {};

// this middleware retrieves a user's favorited plants
favesController.getFaves = (req, res, next) => {
  const queryString = "SELECT faves.* FROM faves";
  const userFaves = db.query(queryString);
  userFaves
    .then((data) => (res.locals.faves = data.rows))
    .then(console.log("fetching user's favorite plants NOW!"))
    .then(() => next());
};


// this middleware checks to see if a plant already exists in our plant table and if it doesn't, inserts the selected plant
favesController.addPlant = (req, res, next) => {
  const { plants } = req.body;
  console.log('in add plant');
  console.log('plants obj', plants);
  
  const insertQuery = 'INSERT INTO plants (common_name) VALUES ($1)'
  
  console.log('plants.scientific_name', plants.scientific_name);
  const plantTemp = ['attempt'];
  const plantDetails = [
      plants.common_name,
      plants.scientific_name,
      plants.family_common_name,
      plants.edible,
      plants.vegetable,
      plants.image_url,
      plants.toxicity,
      plants.growth_habit,
      plants.growth_form,
      plants.growth_rate,
      plants.shape_and_orientation,
      plants.average_height];
  
      const query = {
        text: 'INSERT INTO plants (common_name, scientific_name, family_common_name, edible, vegetable, image_url, toxicity, growth_habit, growth_form, growth_rate, shape_and_orientation, average_height) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        values: [
          plants.common_name,
          plants.scientific_name,
          plants.family_common_name,
          plants.edible,
          plants.vegetable,
          plants.image_url,
          plants.toxicity,
          plants.growth_habit,
          plants.growth_form,
          plants.growth_rate,
          plants.shape_and_orientation,
          plants.average_height
        ],
        rowMode: 'array',
      }
  
    db
    .query(query)
    .then((res) => next());
};

// this middleware adds the selected plant's id (scientific name) to the faves table along with the user id and the user's notes for the plant
favesController.addFave = (req, res, next) => {
  
  
  const { user_id, plant_id, notes } = req.body;
  //   req.body.plants = {...plant details....}
  //
  //req.user_id
  const { plants } = req.body;

  const favesString =
    "INSERT INTO public.faves VALUES (user_id, plant_id, notes)";
  const newFave = db.query(queryString);
  newFave.then(() => next());
};

module.exports = favesController;

/*
Backup controller if "EXISTS" doesn't work as expected

favesController.addPlant = (req, res, next) => {
  const { plants } = req.body;
    const selectQuery = "SELECT";
    const insertQuery = "INSERT INTO";

  const queryString = `public.plants VALUES ( plants.common_name,
    plants.scientific_name,
    plants.family_common_name,
    plants.edible,
    plants.vegetable,
    plants.image_url,
    plants.toxicity,
    plants.growth_habit,
    plants.growth_form,
    plants.growth_rate,
    plants.shape_and_orientation,
    plants.average_height )`;
  //check if plant already exists
  if (db.query(`${selectQuery} ${queryString}`)) {
    then(() => next());
  } else {
      const newPlant = db.query(`${insertQuery} ${queryString}`)
      newPlant.then(() => next())
  }
};

*/
