process.env.NODE_ENV = 'test';

const request = require('supertest');
const assert = require('assert');
const app = require('../src/app');
const Car = require('../src/api/cars/model');

describe("Api Tests", function() {
  after(function() {
    Car.deleteMany({}, (err)=>{
      if (!err) console.log('successfully removed test cars');
    })
  });
  describe('GET /api/cars', function() {
    it('responds with json', function(done) {
      request(app)
      .get('/api/cars')
      .expect('Content-Type', /json/)
      .expect(200, [], done);
    });
  });

  describe('POST /api/cars', function() {
    it('create new car with missing name params', function(done) {
      request(app)
      .post('/api/cars')
      .send({price: 20000, model: "somemodel", sku: 'somesku'})
      .expect(400, done);
    });
  });

  describe('POST /api/cars', function() {
    it('create new car', function(done) {
      request(app)
      .post('/api/cars')
      .send({name: 'carname', price: 20000, model: "somemodel", sku: 'somesku'})
      .expect(201, done);
    });
  });

  describe('POST /api/cars/sell/:id', function() {
    it('sell one car', function(done) {
      request(app)
      .post('/api/cars')
      .send({name: 'carname', price: 120000, model: "somemodel", sku: 'somesku'})
      .expect(201)
      .then(res=>{
        request(app)
        .post(`/api/cars/sell/${res.body._id}`)
        .expect(201)
        .then(updated=>{
          assert(updated.body.status, 'sold out');
          done();
        })
        .catch(err=>done(err));
      })
      .catch(err=>done(err));
    });
  });
});
