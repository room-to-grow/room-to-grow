const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;


// Connection URLs:
const TOKEN = '9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w'
const TREFLE = 'https://trefle.io'
const TREFLE_DIST = 'https://trefle.io/api/v1/distributions'


// QUERY BUILDING by Aki
// Trefle uses the q parameter on the 'v1/distributions/search' endpoint to search through distributions
// the q parameter goes on the end of the url when fetching and looks like this:
// &q=<searchTerm>
// for our purposes, <searchTerm> would be the U.S. state that the user selects, with the first letter capitalized
// do not forget to attach 'search' between {TREFLE_DIST} and {TOKEN_QUERY} when building your search url


// 
app.use('/build', express.static(path.join(__dirname, '../build')));

// serving static file index.html on the route '/':
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// route handlers go here
// const location = require('./routes/locationRouter')
// app.use('/location', location);



// FETCHING DATA FROM TREFLE TO STRUCTURE QUERIES

const fetch = require('node-fetch');
const example = 'Oregon'


// grabs location object for selected US State:
const fetchDistro = async (input) => {
  const response = await fetch(`${TREFLE_DIST}?token=${TOKEN}&q=${input}`);
  const json = await response.json();
  // const url = `/api/v1/distributions/${json.data[0].slug}/species`;
  const url = `${TREFLE_DIST}/${json.data[0].slug}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`
  return getAllPlants(url);
  //return url
};


app.get('/location/:locName', (req,res)=>{
  // send from getFamilyNames
  console.log("testing")

  const familyNames = Promise.resolve((fetchDistro(req.params.locName)))
    .then(data => res.json(data));

 //console.log("is this a promise ? ", familyNames)
})

// grabs plant page for one plant example:
const getAllPlants = async (input) => {
  // const response = await fetch(`${TREFLE}${url}${TOKEN_QUERY}`);
  const response = await fetch(input);
  const json = await response.json();
  const url = json.data[1].links.self;

  return getFamilyNames(json.data)
}

const getFamilyNames = async (data) => {
  // iterate through the array
  // get all the family names
  let obj = {};
  data.forEach(plant => {
    obj[plant["family_common_name"]] = true;
  })
  return Object.keys(obj);
  // send them to the response for the GET request to /api/location/:locName
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
// fetchDistro(example);

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


// unknown path handler
app.get('*', function(req, res){
  res.status(404).send('Whoops, something isn\'t quite right....');
});

// global error handler:
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'globalDefaultErr: Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errObj = Object.assign({}, defaultErr, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
});

// listener:
app.listen(PORT, () => {console.log(`Connected, listening on port ${PORT}`)}); 