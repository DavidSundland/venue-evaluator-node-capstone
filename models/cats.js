"use strict";

const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    }
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
