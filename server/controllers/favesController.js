/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
const db = require('../models/plantModel');

const favesController = {};

// this middleware retrieves a user's favorited plants
favesController.getFaves = (req, res, next) => {
  let currentUser = res.locals.username;
  console.log(currentUser)
  const query = {
  text: `SELECT name, notes FROM faves WHERE username=$1`,
  values: [currentUser]
    
}
  console.log('retrieving user favorites')

  db.query(query)
    .then(data => {
      res.locals.faves = data.rows
      console.log(data.rows);
      return data.rows;
    })
    //{username: , plantname: , note: }
    .then(() => console.log("fetching user's favorite plants NOW!: "))
    .then(() => next());
};

// this middleware checks to see if a plant already exists in our plant table and if it doesn't, inserts the selected plant
favesController.addPlant = (req, res, next) => {
  const { plants } = req.body;
  const selectQuery = 'SELECT scientific_name FROM public.plants WHERE public.plants.scientific_name = plants.scientific_name';
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
  const insertQuery = `INSERT INTO ${queryString} WHERE NOT EXISTS ${selectQuery}`;
  const result = db.query(insertQuery);
  result.then(() => next());
};

// this middleware adds the selected plant's id (scientific name) to the faves table along with the user id and the user's notes for the plant
favesController.addFave = (req, res, next) => {
  const { plantname, note } = req.body
  //   req.body.plants = {...plant details....}
  //
  //req.user_id
  let currentUsername = res.locals.username; 

  let query = {
    text: "INSERT INTO faves VALUES ($1, $2, $3) RETURNING *",
    values:  [currentUsername, plantname, note]
  }
  
  db.query(query)
  .then(data => {
    res.locals.newfav = data.rows[0];
    return next();
  });
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
