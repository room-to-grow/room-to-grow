/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');
const runtime = require('regenerator-runtime');
const server = require('../server/server');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */

// TEST FOR ROOT
describe('Testing the root path', () => {
  describe('GET request', () => {
    it('responds with 200 status and text/html content type',
      () => request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200));

    it('sends back main index.html page',
      async () => {
        const getRequest = await request(server).get('/');
        expect(getRequest.body).toEqual(JSON.parse(fs.readFileSync(path.join(__dirname, '../index.html'))));
      });
  });
});

// TEST FOR BUILD
describe('Testing the build path', () => {
  describe('GET request', () => {
    it('responds with 200 status and application/json content type',
      () => {
        request(server)
          .get('/build')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

    it('markets from "DB" json are in body of response',
      async () => {
        // await fs.writeFile(path.join(__dirname, './../server/db/markets.test.json'), JSON.stringify([{ location: 'here', cards: 11 }]), (err) => {
        //   if (err) throw err;
        // });
        const gtRequest = await request(server).get('/build');
        expect(gtRequest.body).toEqual(express.static(path.join(__dirname, '../build')));
      });
  });
});

// // TEST FOR lOCATION
describe('Testing the location path', () => {
  describe('GET request', () => {
    it('responds with 200 status and text/html content type',
      () => request(server)
        .get('/location/Florida')
        .expect('Content-Type', /application\/json/)
        .expect(200));
  });
});

// TEST FOR USER
describe('Testing the user path', () => {
  describe('POST request', () => {
    const data = {
      username: 'test',
      password: 'pass',
    };
    it('should create a new user', async () => {
      const res = await request(server)
        .post('/user/signup')
        .send(data)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .expect('{"message":"usernameInUse"}');
    });
  });
});
