const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Connection URLs:
const TOKEN_QUERY = '?token=9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w'
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



// FETCHING DATA FROM TREFLE TO STRUCTURE QUERIES

const fetch = require('node-fetch');

(async () => {
  const response = await fetch(`${TREFLE_DIST}${TOKEN_QUERY}&q=Colorado`);
  const json = await response.json();
  console.log(json);
})();

// ************************************************



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