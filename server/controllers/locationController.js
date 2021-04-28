const fetch = require("node-fetch");
const db = require("../models/plantModel");

// QUERY BUILDING by Aki
// Trefle uses the q parameter on the 'v1/distributions/search' endpoint to search through distributions
// the q parameter goes on the end of the url when fetching and looks like this:
// &q=<searchTerm>
// for our purposes, <searchTerm> would be the U.S. state that the user selects, with the first letter capitalized
// do not forget to attach 'search' between {TREFLE_DIST} and {TOKEN_QUERY} when building your search url

// Connection URLs:
const TOKEN = "9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w";
const TREFLE = "https://trefle.io/api/v1";
const TREFLE_DIST = "https://trefle.io/api/v1/distributions";

const locationController = {};

// this middleware grabs an array of plant family names from the Trefle API
// the key is 'family_name_common'
// formerly known as 'fetchDistro'
locationController.familyNames = async (req, res, next) => {
  console.log("HERE COMES THE LOCNAME");
  console.log(req.params)
  console.log(req.params.locName);
  const response = await fetch(
    `${TREFLE_DIST}?token=${TOKEN}&q=${req.params.locName}`
  );
  const json = await response.json();
  console.log("HERE COMES THE JSON")
  console.log(json);

  //const json = await response.json();
  //console.log(`${TREFLE_DIST}/${location}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`)
  const slug = json.data[0].slug;
  const url = `${TREFLE_DIST}/${slug}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`;
  const newResponse = await fetch(url);
  const jsonRes = await newResponse.json();
  const data = jsonRes.data;
  const obj = {};
  data.forEach((plant) => {
    obj[plant["family_common_name"]] = true;
  });

  console.log(obj)
  //res.locals.families = Object.keys(obj);
  res.locals.families = {
    families: Object.keys(obj),
    slug: slug,
  };
  // console.log(res.locals.families)
  return next();
};

// this middleware will return a random selection of 30 native plants from the selected state
// example url:
// https://trefle.io/api/v1/distributions/col/plants?filter[establishment]=native&filter[family_common_name]=Mint%20family&token=9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w
locationController.getPlants = async (req, res, next) => {
  // const response = await fetch(`${TREFLE_DIST}?token=${TOKEN}&q=${req.params.locName}`);
  // const json = await response.json();
  const url = `${TREFLE_DIST}/${req.params.locName}/plants?filter%5Bestablishment%5D=native&filter[family_common_name]=${req.params.famName}&token=${TOKEN}`;
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
  for (let i = 0; i < 20; i++) {
    const plant = {
      common_name: data[i].common_name,
      scientific_name: data[i].scientific_name,
      image_url: data[i].image_url,
    };
    randoPlants.push(data[i]);
    console.log(plant);
  }
  res.locals.plants = {
    plants: randoPlants,
    family: req.params.famName,
    slug: req.params.locName,
  };
  return next();
};

// this middleware will return a more detailed plant object
locationController.getDetails = async (req, res, next) => {
  //req.params.plantName will be the scientific name of the plant as a string

  // `${TREFLE_DIST}/tex/plants?filter%5Bestablishment%5D=native&filter[family_common_name]=Rose Family&filter[scientific_name]=Prunus serotina&token=${TOKEN}`

  // const response = await fetch(`${TREFLE}/plants?token=${TOKEN}&filter[scientific_name]=${req.params.plantName}`);
  const response = await fetch(
    `${TREFLE_DIST}/${req.params.locName}/plants?filter%5Bestablishment%5D=native&filter[family_common_name]=${req.params.famName}&filter[scientific_name]=${req.params.plantName}&token=${TOKEN}`
  );
  const json = await response.json();
  const url = `http://trefle.io${json.data[0].links.self}?token=${TOKEN}`;
  const newResponse = await fetch(url);
  const jsonRes = await newResponse.json();
  const data = jsonRes.data;
  const resultObj = {
    common_name: data.common_name,
    scientific_name: data.scientific_name,
    family_common_name: data.family_common_name,
    edible: data.edible,
    vegetable: data.vegetable,
    image_url: data.image_url,
    toxicity: data.specifications.toxicity,
    growth_habit: data.specifications.growth_habit,
    growth_form: data.specifications.growth_form,
    growth_rate: data.specifications.growth_rate,
    shape_and_orientation: data.specifications.shape_and_orientation,
    average_height: data.specifications.average_height.cm / 100 + " meters",
  };
  console.log(resultObj);
  res.locals.plantInfo = resultObj;
  return next();
};

// old async fetch requests
// grabs plant page for one plant example:
const getAllPlants = async (input) => {
  // const response = await fetch(`${TREFLE}${url}${TOKEN_QUERY}`);
  const response = await fetch(input);
  const json = await response.json();
  const url = json.data[1].links.self;
  return getSpecies(url);
};

// grabs species page for example plant with advanced details, more key-value pairs:
const getSpecies = async (input) => {
  console.log(input);
  console.log(`${TREFLE}${input}?token=${TOKEN}`);
  const response = await fetch(`${TREFLE}${input}?token=${TOKEN}`);
  const json = await response.json();
  console.log(Object.keys(json.data));
  console.log(json.data.observations);
};

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
