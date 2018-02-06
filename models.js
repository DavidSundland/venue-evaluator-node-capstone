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


// this virtual grabs the most recent grade for a restaurant.  ****UPDATE!!! ****
restaurantSchema.virtual('grade').get(function () {
    const gradeObj = this.grades.sort((a, b) => {
        return b.date - a.date
    })[0] || {};
    return gradeObj.grade;
});

// this is an *instance method* which will be available on all instances  *****UPDATE!!! ****
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
restaurantSchema.methods.serialize = function () {

    return {
        id: this._id,
        name: this.name,
        cuisine: this.cuisine,
        borough: this.borough,
        grade: this.grade,
        address: this.addressString
    };
}


const Review = mongoose.model('Review', reviewSchema);

module.exports = {
    Review
};
