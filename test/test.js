// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db

// using ES6 promises

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// requiring in the js files from this app
const Venue = require('../models/locations');
//console.log(Achievement);
const User = require('../models/user');
//console.log(User);
const Review = require('../models/reviews')
const {
    app,
    runServer,
    closeServer
} = require('../server');

// import databases from ('../config');
const {
    DATABASE_URL,
    TEST_DATABASE_URL
} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);

const testUsername = faker.random.word();
const password = faker.random.word(6);

function generateFilters() {
    const venuetypes = [
        'all', 'dedicated', 'musicFirst', 'foodFirst'];
    const venuetype = venuetypes[Math.floor(Math.random() * venuetypes.length)];
    const venuesizes = [
        'all', 'small', 'medium', 'large'];
    const venuesize = venuesizes[Math.floor(Math.random() * venuesizes.length)];
    const freeticketeds = [
        'all', 'free', 'ticketed'];
    const freeticketed = freeticketeds[Math.floor(Math.random() * freeticketeds.length)];
    return [venuetype, venuesize, freeticketed];
}

//  '/venues/partiallist/' + venuetype + '/' + venuesize + '/' + freeticketed

describe('Retrieve venues from static db with filters applied', function () {

    before(function () {
        return runServer(DATABASE_URL)
            .then(console.log('running server for ACTUAL database'))
            .catch(err => console.log({
                err
            }));
    });
    describe('Retrieve operations', function () {
        it('should return a list of venues or a value of null', function (done) {
            const filters = generateFilters();
            const venuetype = filters[0];
            const venuesize = filters[1];
            const freeticketed = filters[2];
            chai.request(app)
                .get('/venues/partiallist/' + venuetype + '/' + venuesize + '/' + freeticketed)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
        after(function () {
            return closeServer();
        });
    });
});

describe('Retrieve venues from static db with NO filters applied', function () {

    before(function () {
        return runServer(DATABASE_URL)
            .then(console.log('running server for ACTUAL database'))
            .catch(err => console.log({
                err
            }));
    });
    describe('Retrieve operations', function () {
        it('should return a list of all venues', function (done) {
            const venuetype = "all";
            const venuesize = "all";
            const freeticketed = "all";
            chai.request(app)
                .get('/venues/partiallist/' + venuetype + '/' + venuesize + '/' + freeticketed)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.results.should.have.length.of.at.least(80);
                    done();
                });
        });
        after(function () {
            return closeServer();
        });
    });
});
