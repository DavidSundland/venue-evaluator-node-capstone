"use strict";

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    "longvenuename": {
        type: String,
        required: false
    },
    "venuename": {
        type: String,
        required: false
    },
    "genre": {
        type: String,
        required: false
    },
    "website": {
        type: String,
        required: false
    },
    "googlemap": {
        type: String,
        required: false
    },
    "latitude": {
        type: String,
        required: false
    },
    "longitude": {
        type: String,
        required: false
    },
    "fulladdress": {
        type: String,
        required: false
    },
    "streetaddress": {
        type: String,
        required: false
    },
    "city": {
        type: String,
        required: false
    },
    "state": {
        type: String,
        required: false
    },
    "zip": {
        type: String,
        required: false
    },
    "description": {
        type: String,
        required: false
    },
    "imageurl": {
        type: String,
        required: false
    },
    "venuetype": {
        type: String,
        required: false
    },
    "venuesize": {
        type: String,
        required: false
    },
    "free": {
        type: String,
        required: false
    },
    "ticketed": {
        type: String,
        required: false
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
