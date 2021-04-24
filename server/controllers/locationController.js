const fetch = require('node-fetch');
const db = require('../models/plantModel');

const locationController = {};

// this middleware grabs an array of plant family names from the Trefle API
// the key is 'family_name_common'
// formerly known as 'fetchDistro'
locationController.familyNames = async (req, res, next) => {
    await fetch(`${TREFLE_DIST}?token=${TOKEN}&q=${req.body}`);
    const json = await res.json();
    // const url = `/api/v1/distributions/${json.data[0].slug}/species`;
    res.locals.url = `${TREFLE_DIST}/${json.data[0].slug}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`;
    const data = json.data;
    const obj = {};
    data.forEach(plant => {
      obj[plant["family_common_name"]] = true;
    })
    res.locals.families = Object.keys(obj);
    return next();
}


//********************************************************
// FETCHING DATA FROM TREFLE TO STRUCTURE OUR MIDDLEWARE
//********************************************************

const example = 'Oregon'

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
