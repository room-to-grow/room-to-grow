const fetch = require('node-fetch');
const db = require('../models/plantModel');


// Connection URLs:
const TOKEN = '9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w'
const TREFLE = 'https://trefle.io'
const TREFLE_DIST = 'https://trefle.io/api/v1/distributions'


const locationController = {};

// this middleware grabs an array of plant family names from the Trefle API
// the key is 'family_name_common'
// formerly known as 'fetchDistro'
locationController.familyNames = async (req, res, next) => {
    const response = await fetch(`${TREFLE_DIST}?token=${TOKEN}&q=${req.params.locName}`);  
    const json = await response.json();
    //console.log(`${TREFLE_DIST}/${location}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`)
    const url = `${TREFLE_DIST}/${json.data[0].slug}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`;
    const newResponse = await fetch(url);
    const jsonRes = await newResponse.json();
    const data = jsonRes.data;
    const obj = {};
    data.forEach(plant => {
        obj[plant["family_common_name"]] = true;
    })
    //console.log(obj)
    res.locals.families = Object.keys(obj);
    //console.log(res.locals.families)
    return next();
};

// this middleware will return a random selection of 30 native plants from the selected state
// example url:
// https://trefle.io/api/v1/distributions/col/plants?filter[establishment]=native&filter[family_common_name]=Mint%20family&token=9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w
locationController.getPlants = async (req, res, next) => {
    const response = await fetch(`${TREFLE_DIST}?token=${TOKEN}&q=${req.params.locName}`);
    const json = await response.json();
    const url = `${TREFLE_DIST}/${json.data[0].slug}/plants?filter%5Bestablishment%5D=native&filter[family_common_name]=${req.params.famName}&token=${TOKEN}`;
    const newResponse = await fetch(url);
    const jsonRes = await newResponse.json();
    const data = jsonRes.data;

    const randoPlants = [];

    // randomizer function follows:
    // function randomizer(max, count = 0) {
    //     if (count===max) return randoPlants;
    //     let random = Math.floor(Math.random() * jsonRes.meta);
    //     randoPlants.push(data[random]);
    //     console.log(random);
    //     return randomizer(max, count + 1);
    //   }
    // randomizer(5);
    for (let i=0; i<5; i++) {
        randoPlants.push(data[i]);
        console.log(data[i].common_name);
    }
    res.locals.plants = randoPlants;
    return next();
}

//********************************************************
// FETCHING DATA FROM TREFLE TO STRUCTURE OUR MIDDLEWARE
//********************************************************

// grabs plant page for one plant example:
const getAllPlants = async (input) => {
  // const response = await fetch(`${TREFLE}${url}${TOKEN_QUERY}`);
  const response = await fetch(input);
  const json = await response.json();
  const url = json.data[1].links.self;
  return getSpecies(url);
}


// grabs species page for example plant with advanced details, more key-value pairs:
const getSpecies = async (input) => {
  console.log(input)
  console.log(`${TREFLE}${input}?token=${TOKEN}`);
  const response = await fetch(`${TREFLE}${input}?token=${TOKEN}`);
  const json = await response.json();
  console.log(Object.keys(json.data));
  console.log(json.data.observations)
}


// calling the async fetches here


// ************************************************

/**
 * [
  'id',            'common_name',
  'slug',          'scientific_name',
  'year',          'bibliography',
  'author',        'status',
  'rank',          'family_common_name',
  'genus_id',      'observations',
  'vegetable',     'image_url',
  'genus',         'family',
  'duration',      'edible_part',
  'edible',        'images',
  'common_names',  'distribution',
  'distributions', 'flower',
  'foliage',       'fruit_or_seed',
  'sources',       'specifications',
  'synonyms',      'growth',
  'links'
]
 */


module.exports = locationController;