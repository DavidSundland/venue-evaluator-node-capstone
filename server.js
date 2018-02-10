const User = require('./models/user');
const Review = require('./models/reviews');
const Location = require('./models/locations');
const Cat = require('./models/cats')
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

console.log("re-started");

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}


// log the http layer
//app.use(morgan('common'));  // removed Morgan from dependencies due to NPM install issues (can "npm install --save morgan" if morgan needed)

app.use(express.static('public'));

// Create new user
app.post('/users/create', (req, res) => {
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                username,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                if (item) {
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// Login / sign a user in
app.post('/signin', function (req, res) {
    const user = req.body.username;
    const pw = req.body.password;
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                // bad username
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        console.log("User logged in: " + req.body.username + ' at ' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });
});

// get list of venues from db
//app.get('/venues', (req, res) => {
//    Venues
//        .find()
//        .then(results => {
//            res.json(results.map(item => item.serialize()));
//        })
//        .catch(err => {
//            console.error(err);
//            res.status(500).json({
//                error: 'something went terribly wrong'
//            });
//        });
//});

// retrieve all of the venues
app.get('/locations', function (req, res) {
    Location
        .find()
        .then(function (results) {
            res.json({
                results
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// check to see if user has review for venue
app.get('/reviews/check/:userName/:venueName', function (req, res) {
    console.log("$$$$$$$$$$$$ IN GET TO CHECK FOR USER REVIEWS");
    let userName = req.params.userName;
    let venueName = req.params.venueName;
    Review
        .findOne({
            venueName: venueName,
            userName: userName
        })
        .then(function (results) {
            console.log("In get one review, results: ", results);
            res.json({
                results
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// get one venue
app.get('/locations/onevenue/:venName', function (req, res) {
    const {
        venName
    } = req.params;
    console.log("This is what I got for venName:", venName);
    Location
        .findOne({
            venuename: venName
        })
        .then(function (results) {
            //            console.log("req.params: ", req.params, " & results: ", results);
            res.json({
                results
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

app.get('/venuereviews/:venName', function (req, res) {
    const {
        venName
    } = req.params;
    console.log("This is what I got for venName when retrieving reviews:", venName);
    Review
        .find({
            venueName: venName
        })
        .then(function (results) {
            //            console.log("RESULTS FROM QUERYING REVIEWS:", results);
            res.json({
                results
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

app.get('/venues/partiallist/:venuetype/:venuesize/:freeticketed', function (req, res) {
    let venuetype = req.params.venuetype;
    let venuesize = req.params.venuesize;
    let freeticketed = req.params.freeticketed;
    if (venuetype === "all" && venuesize === "all" && freeticketed === "all") {
        Location
            .find()
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuetype === "all" && venuesize === "all" && freeticketed === "free") {
        Location
            .find({
                free: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuetype === "all" && venuesize === "all") {
        Location
            .find({
                ticketed: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuetype === "all" && freeticketed === "all") {
        Location
            .find({
                venuesize: venuesize
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuesize === "all" && freeticketed === "all") {
        Location
            .find({
                venuetype: venuetype
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuetype === "all" && freeticketed === "free") {
        Location
            .find({
                venuesize: venuesize,
                free: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuetype === "all") {
        Location
            .find({
                venuesize: venuesize,
                ticketed: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuesize === "all" && freeticketed === "free") {
        Location
            .find({
                venuetype: venuetype,
                free: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (venuesize === "all") {
        Location
            .find({
                venuetype: venuetype,
                ticketed: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (freeticketed === "all") {
        Location
            .find({
                venuetype: venuetype,
                venuesize: venuesize
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else if (freeticketed === "free") {
        Location
            .find({
                venuetype: venuetype,
                venuesize: venuesize,
                free: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    } else {
        Location
            .find({
                venuetype: venuetype,
                venuesize: venuesize,
                ticketed: "TRUE"
            })
            .then(function (results) {
                res.json({
                    results
                });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    }
});


app.get('/cats', function (req, res) {
    Cat
        .find()
        .then(function (results) {
            res.json({
                results
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//app.post('/new/create', (req, res) => {
//    let name = req.body.name;
//    let color = req.body.color;
//    Cat.create({
//        name,
//        color
//    }, (err, item) => {
//        if (err) {
//            return res.status(500).json({
//                message: 'Infernal Server Error'
//            });
//        }
//        if (item) {
//            console.log(`Cat created:  ${name}, ${color}.`);
//            return res.json(item);
//        }
//    });
//});

//create new review
app.post('/new/create', (req, res) => {
    let venueName = req.body.venueName;
    let userName = req.body.userName;
    let listeningExperience = req.body.listeningExperience;
    let venueFeel = req.body.venueFeel;
    let musicValue = req.body.musicValue;
    let musicQuality = req.body.musicQuality;
    let foodQuality = req.body.foodQuality;
    let foodValue = req.body.foodValue;
    let userReview = req.body.userReview;

    Review.create({
        venueName,
        userName,
        listeningExperience,
        venueFeel,
        musicValue,
        musicQuality,
        foodQuality,
        foodValue,
        userReview
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Infernal Server Error'
            });
        }
        if (item) {
            console.log(`Review for ${venueName} by ${userName} added.`);
            return res.json(item);
        }
    });
});


// DELETE ----------------------------------------
// deleting an achievement by id
app.delete('/delete/:id', function (req, res) {
    Review.findByIdAndRemove(req.params.id).exec().then(function () {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});




// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
