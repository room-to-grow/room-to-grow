/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = require('../server/server');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */

describe('Server Side Functionality', () => {
  // TEST FOR ROOT
  describe('Testing the root path', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type',
        () => request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });

  // TEST FOR BUILD
  describe('Testing the build path', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type',
        () => {
          request(server)
            .get('/build')
            .expect('Content-Type', /application\/json/)
            .expect(200);
        });

      xit('markets from "DB" json are in body of response',
        async () => {
          await fs.writeFile(path.join(__dirname, './../server/db/markets.test.json'), JSON.stringify([{ location: 'here', cards: 11 }]), (err) => {
            if (err) throw err;
          });
          const gtRequest = await request(server).get('/markets');
          expect(gtRequest.body).toEqual(JSON.parse(fs.readFileSync(path.join(__dirname, './../server/db/markets.test.json'))));
        });
    });
  });

  // TEST FOR lOCATION
  describe('Testing the location path', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type',
        () => request(server)
          .get('/location')
          .expect('Content-Type', /application\/json/)
          .expect(200));
    });
  });

  // TEST FOR USER
  describe('Testing the user path', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type',
        () => request(server)
          .get('/user')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
});
