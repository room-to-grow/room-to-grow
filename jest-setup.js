/* eslint-disable linebreak-style */
/* eslint-disable global-require */
import 'babel-polyfill';

module.exports = async () => {
  global.testServer = await require('./server/server.js');
};
