'use strict';

const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    venueName: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    listeningExperience: {
        type: String,
        required: false
    },
    venueFeel: {
        type: String,
        required: false
    },
    musicValue: {
        type: String,
        required: false
    },
    bandQuality: {
        type: String,
        required: false
    },
    foodQuality: {
        type: String,
        required: false
    },
    foodValue: {
        type: String,
        required: false
    },
    review: {
        type: String,
        required: false
    }
});


const Reviews = mongoose.model('Reviews', reviewSchema);


module.exports = {
    Reviews
};
