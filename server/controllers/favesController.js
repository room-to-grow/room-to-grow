const db = require("../models/plantModel");

const favesController = {};

// this middleware retrieves a user's favorited plants
favesController.getFaves = async (req, res, next) => {
  console.log('in get faves')
  const userQueryString = {
    text : 'SELECT plants.common_name, plants.scientific_name FROM plants JOIN(SELECT plant_id FROM favorites WHERE user_id = $1) AS favs ON plants._id = favs.plant_id',
    //text : 'SELECT plant_id FROM favorites WHERE user_id = $1',
    values : [res.locals.user_id],
    rowMode : 'array'
  }

  const fav_plants = await db.query(userQueryString);

  res.locals.favorites = fav_plants.rows;
  console.log('in getFaves')
  console.log(res.locals.favorites)
  next();
 
};


// this middleware checks to see if a plant already exists in our plant table and if it doesn't, inserts the selected plant
favesController.addPlant = async (req, res, next) => {
  const { plants } = req.body;
  

  //console.log('plants obj', 

  // async function find () {
  const find_query = {
    text: 'SELECT * FR,OM plants WHERE plants.scientific_name = ($1)',
    values: [
      plants.scientific_name,
    ],
    rowMode: 'array',
  }

  const find_result = await db.query(find_query);
  console.log('getting result of find_query')
  console.log(find_result);
  // } find().catch(e => e.stack)
  if(find_result.rows.length !== 0){
    return next();
  }
 
 
  
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
    const result = await db.query(query)
    next();
};

// this middleware adds the selected plant's id (scientific name) to the faves table along with the user id and the user's notes for the plant
favesController.addFave = async (req, res, next) => {
  
 
  const { user_id, plant_id, notes } = req.body;

  const { plants } = req.body;
  

  //console.log('plants obj', 

  // async function find () {
  const find_query = {
    text: 'SELECT * FROM plants WHERE plants.scientific_name = ($1)',
    values: [
      plants.scientific_name,
    ],
    rowMode: 'array',
  }

  const find_result = await db.query(find_query);
  console.log('getting result of find_query')
  console.log(find_result);
  // } find().catch(e => e.stack)
  if(find_result.rows.length !== 0){
    return next();
  }
  
  console.log(user_id)
  console.log(plant_id)
  const userQueryString = {
    text : 'SELECT _id from users WHERE users.username = $1',
    values : [user_id],
    rowMode : 'array'
  }
  const plantQueryString = {
    text : 'SELECT _id from plants WHERE plants.scientific_name = $1',
    values : [plant_id],
    rowMode : 'array'
  }

  const user_result = await db.query(userQueryString);
  const plant_result = await db.query(plantQueryString);
  console.log(user_result);
  console.log(plant_result);
  const addQueryString = {
    text : 'INSERT INTO favorites (plant_id, user_id) VALUES ($1, $2)',
    values : [plant_result.rows[0][0], user_result.rows[0][0]],
    rowMode : 'array'
  }


  const favorites_result = await db.query(addQueryString);
  
  res.locals.user_id = user_result.rows[0][0];
  next();

};

favesController.deleteFav = async (req, res, next) => {
    // similar to addFav
    const { username, plantName } = req.body;
  console.log(req.body)
    console.log(username)
    console.log(plantName)
    const userQueryString = {
      text : 'SELECT _id from users WHERE users.username = $1',
      values : [username],
      rowMode : 'array'
    }
    const plantQueryString = {
      text : 'SELECT _id from plants WHERE plants.scientific_name = $1',
      values : [plantName],
      rowMode : 'array'
    }

    const user_result = await db.query(userQueryString);
    const plant_result = await db.query(plantQueryString);

    const deleteQueryString = {
      text : 'DELETE FROM favorites WHERE favorites.plant_id = $1 AND  favorites.user_id = $2',
      values : [plant_result.rows[0][0], user_result.rows[0][0]],
      rowMode : 'array'
    }
    const favorites_result = await db.query(deleteQueryString);
    res.locals.user_id = user_result.rows[0][0];
    next();
    
}



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
