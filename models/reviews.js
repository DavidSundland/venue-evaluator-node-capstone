'use strict';

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    musicQuality: {
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
    userReview: {
        type: String,
        required: false
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
