const request = require('supertest');
const fs = require('fs');
const path = require('path');
import 'regenerator-runtime/runtime';


const server = 'http://localhost:3000';



describe('route integration', () => {

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/location', () => {
    describe('GET to /location/', () => {
      it('responds with 200 status and list of plant families from the state', () => {
        return request(server)
          .get('/location/Texas')
          .expect((res) => {
            return res.body === {"families":["Grass family","Rush family","Mint family","Horsetail family","Polypody family","Morning-glory family","Aster family","Cat-tail family","Arum family","Sedge family","Buttercup family","Rose family"],"slug":"tex"};
          });
      });
    });
  });

  describe('/signup', () => {
    describe('POST to /signup/login', () => {
      it('responds with 200 status and sign up confirmation', async () => {
        const userBody = {"username": "cat99", "password": "password123"};
        return await request(server)
          .post('/signup/login')
          .send(userBody)
          .expect(200)
      })
    });
  })

});