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
//
//venueSchema.methods.serialize = function () {
//    return {
//        Venue_Name_Long: this.Venue_Name_Long,
//        Venue_Name: this.Venue_Name,
//        Website: this.Website,
//        Latitude: this.Latitude,
//        Longitude: this.Longitude,
//        Street_Address: this.Street_Address,
//        Description: this.Description,
//        Image_URL: this.Image_URL,
//        Venue_Type: this["Venue Type"],
//        Venue_Size: this["Venue Size"],
//        Free: this["Free?"],
//        Ticketed: this["Ticketed?"]
//    };
//};

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
