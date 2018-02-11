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
//const jsdom = require('jsdom');
//var document = jsdom.jsdom("");
//var window = document.defaultView;
//
//global.window = window
//global.$ = require('jquery');

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
    TEST_DATABASE_URL
} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);

function tearDownDb() {
    console.warn('Deleting database!');
    return mongoose.connection.dropDatabase();
}

function createUser() {
    const testUsername = faker.random.word();
    const password = faker.random.word(6);
    return {
        username: testUsername,
        password: password
    }
}

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

function pickOneVenue() { // for sake of testing, don't need to use name of actual venue
    return faker.company.companyName;
}

function makeReview(testVenue) {
    return {
        //    venueName: pickOneVenue(),
        userName: createUser().username,
        listeningExperience: faker.random.number({
            min: 1,
            max: 5
        }),
        venueFeel: faker.random.number({
            min: 1,
            max: 5
        }),
        musicValue: faker.random.number({
            min: 1,
            max: 5
        }),
        musicQuality: faker.random.number({
            min: 1,
            max: 5
        }),
        foodQuality: faker.random.number({
            min: 0,
            max: 5
        }),
        foodValue: faker.random.number({
            min: 0,
            max: 5
        }),
        userReview: faker.lorem.sentence(),
        venueName: testVenue
    }
}

function seedReviewData(testVenue) {
    console.info('Seeding review data');
    const seedData = [];
    for (let i = 1; i <= 5; i++) {
        seedData.push(makeReview(testVenue));
    }
    // console.log(seedData);
    // console.log(Achievement);
    // should return a promise
    return Review.insertMany(seedData);
}

const TESTVENUE = pickOneVenue(); // want to use same venue for all reviews

//describe('Retrieve venues from static db with filters applied ', function () {
//    before(function () {
//        return runServer(DATABASE_URL)
//            .then(console.log('running server for ACTUAL database'))
//            .catch(err => console.log({
//                err
//            }));
//    });
//    describe('Retrieve operations', function () {
//        it('should return an object of venues or a value of null', function (done) {
//            const filters = generateFilters();
//            const venuetype = filters[0];
//            const venuesize = filters[1];
//            const freeticketed = filters[2];
//            chai.request(app)
//                .get('/venues/partiallist/' + venuetype + '/' + venuesize + '/' + freeticketed)
//                .end(function (err, res) {
//                    res.should.have.status(200);
//                    res.should.be.json;
//                    done();
//                });
//        });
//        after(function () {
//            return closeServer();
//        });
//    });
//});
//
//describe('Retrieve venues from static db with NO filters applied', function () {
//
//    before(function () {
//        return runServer(DATABASE_URL)
//            .then(console.log('running server for ACTUAL database'))
//            .catch(err => console.log({
//                err
//            }));
//    });
//    describe('Retrieve operations', function () {
//        it('should return an object of all venues with at least 80 results', function (done) {
//            const venuetype = "all";
//            const venuesize = "all";
//            const freeticketed = "all";
//            chai.request(app)
//                .get('/venues/partiallist/' + venuetype + '/' + venuesize + '/' + freeticketed)
//                .end(function (err, res) {
//                    res.should.have.status(200);
//                    res.should.be.json;
//                    res.body.should.be.a('object');
//                    res.body.results.should.have.length.of.at.least(80);
//                    done();
//                });
//        });
//        after(function () {
//            return closeServer();
//        });
//    });
//});

describe('Reviews API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL)
            .then(console.log('running test db server'))
            .catch(err => console.log({
                err
            }));
    });

    beforeEach(function () {
        return seedReviewData(TESTVENUE);
    });

    describe('GET endpoint', function () {
        it('should return all reviews in the DB for a venue', function () {
            let res;
            return chai.request(app)
                .get('/venuereviews/' + TESTVENUE)
                .then(function (res) {
                    res.should.have.status(200);
                    res.body.results.should.have.length.of.at.least(5); // can remove .at.least if deleting db each time?
                });
        });
    });

    it('should return reviews with the right fields', function () {
        // ensure they have the expected keys
        return chai.request(app)
            .get('/venuereviews/' + TESTVENUE)
            .then(function (res) {
                res.should.be.json;
                res.body.results.should.be.a('array');

                res.body.results.forEach(function (review) {
                    review.should.be.a('object');
                    review.should.include.keys(
                        'listeningExperience', 'venueFeel', 'musicValue', 'musicQuality', 'userName');
                });
            });
    });

    describe('POST endpoint', function () {
        it('should add a new review', function () {
            const newReview = makeReview();
            newReview.venueName = pickOneVenue();
            console.log(newReview);

            return chai.request(app)
                .post('/new/create')
                .send(newReview)
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'listeningExperience', 'venueFeel', 'musicValue', 'musicQuality', 'userName');
                    res.body.userName.should.equal(newReview.userName);
                    res.body.listeningExperience.should.equal(newReview.listeningExperience.toString());

                    //                return Achievement.findById(res.body.id);
                })
        });
    });

    //    describe('PUT endpoint', function() {
    //        it('should update fields sent over', function() {
    //            const updateData = {
    //                achieveWhat: 'Picked a peck of pickled peppers',
    //                achieveWhy: 'To fetch a pail of water'
    //            };
    //
    //            return Achievement
    //                .findOne()
    //                .then(function(achievement) {
    //                updateData.id = achievement.id;
    //                return chai.request(app)
    //                    .put(`/achievement/${achievement.id}`)
    //                    .send(updateData);
    //            })
    //                .then(function(res) {
    //                res.should.have.status(204);
    //                return Achievement.findById(updateData.id);
    //            })
    //                .then(function(achievement) {
    //                achievement.achieveWhat.should.equal(updateData.achieveWhat);
    //                achievement.achieveWhy.should.equal(updateData.achieveWhy);
    //            });
    //        });
    //    });
    //
    //    describe('DELETE endpoint', function() {
    //        it('should delete an achievement by ID', function() {
    //            let achievement;
    //            return Achievement
    //                .findOne()
    //                .then(function(_achievement) {
    //                achievement = _achievement;
    //                return chai.request(app).delete(`/achievement/${achievement.id}`);
    //            })
    //                .then(function(res) {
    //                res.should.have.status(204);
    //                return Achievement.findById(achievement.id);
    //            })
    //                .then(function(_achievement) {
    //                should.not.exist(_achievement);
    //            });
    //        });
    //    });
    //
    //    afterEach(function () {
    //        return tearDownDb();
    //    });

    after(function () {
        return closeServer();
    });
});
