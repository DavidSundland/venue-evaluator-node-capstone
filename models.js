'use strict';

const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    venueId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    listeningExperience: {
        type: Number,
        required: true
    },
    venueFeel: {
        type: Number,
        required: true
    },
    musicValue: {
        type: Number,
        required: true
    },
    bandQuality: {
        type: Number,
        required: true
    },
    foodQuality: {
        type: Number,
        required: false
    },
    foodValue: {
        type: Number,
        required: false
    },
    review: {
        type: String,
        required: false
    }
});

const venueSchema = mongoose.Schema({
    "_id": {
        type: String,
        required: true
    },
    "Venue_Name_Long": {
        type: String,
        required: true
    },
    "Venue_Name": {
        type: String,
        required: true
    },
    "Primary_Genre": {
        type: String,
        required: true
    },
    "Website": {
        type: String,
        required: true
    },
    "Google_Map_URL": {
        type: String,
        required: true
    },
    "Latitude": {
        type: Number,
        required: true
    },
    "Longitude": {
        type: Number,
        required: true
    },
    "Full_Address": {
        type: String,
        required: true
    },
    "Street_Address": {
        type: String,
        required: true
    },
    "City": {
        type: String,
        required: true
    },
    "State": {
        type: String,
        required: true
    },
    "Zip": {
        type: String,
        required: true
    },
    "Description": {
        type: String,
        required: true
    },
    "Image_URL": {
        type: String,
        required: true
    },
    "Venue Type": {
        type: String,
        required: true
    },
    "Venue Size": {
        type: String,
        required: true
    },
    "Free?": {
        type: Boolean,
        required: true
    },
    "Ticketed?": {
        type: Boolean,
        required: true
    }
}, {
    collection: 'venues-with-all-ratings'
});
//});  USE IF COLLECTION THING DOESN'T WORK

venueSchema.methods.serialize = function () {
    return {
        id: this._id,
        Venue_Name_Long: this.Venue_Name_Long,
        Venue_Name: this.Venue_Name,
        Website: this.Website,
        Latitude: this.Latitude,
        Longitude: this.Longitude,
        Street_Address: this.Street_Address,
        Description: this.Description,
        Image_URL: this.Image_URL,
        Venue_Type: this["Venue Type"],
        Venue_Size: this["Venue Size"],
        Free: this["Free?"],
        Ticketed: this["Ticketed?"]
    };
};


const Review = mongoose.model('Review', reviewSchema);
const venueInfo = mongoose.model('venueInfo', venueSchema);

module.exports = {
    Review,
    venueInfo
};
