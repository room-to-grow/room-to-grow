
const { Pool } = require("pg");

/*Schema set up as below - used CREATE TABLE in ElephantSQL to make the schema. Syntax used listed below:
CREATE TABLE faves (
image TEXT,
commonname TEXT,
scientific TEXT,
edible BOOLEAN,
vegetable TEXT,
notes TEXT
);
*/

//URI to elephantSQL database that will store the users favorite plants and any notes that add to those faves
const PG_URI = "postgres://sdwuwgqm:Q9JX9BZljzycURlyiyGYSwU6xX0O1tXz@queenie.db.elephantsql.com:5432/sdwuwgqm";

//create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI,
})

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

// exporting module with some console logs
module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    params = pool.connectionString;
    console.log('executed params', params);
    console.log('executed callback', callback);
    return pool.query(text, params, callback);
  },
};