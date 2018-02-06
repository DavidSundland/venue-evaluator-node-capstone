const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// THE FOLLOWING IS BASED ON AN EXAMPLE THAT USES VOLATILE STORAGE.  NEED TO MAKE NECESSARY UPDATES TO INSTEAD USE DATABASE
const {Reviews} = require('./models');


// IN WHAT INSTANCE WOULD WE WANT TO RETURN ALL REVIEWS?  WOULD ONLY WANT REVIEWS FOR INDIVIDUAL VENUES
// send back JSON representation of all reviews
// on GET requests to root
router.get('/', (req, res) => {
res.json(Reviews.get());
});


// when new review added, ensure has required fields. if not,
// log error and return 400 status code with hepful message.
// if okay, add new item, and return it with a status 201.
router.post('/', jsonParser, (req, res) => {
// don't require written comments (since some people are lazy) or food/beverage reviews (since some venues have no food/bev)
const requiredFields = ['venueId', 'userName', 'listeningExperience', 'venueFeel', 'musicValue', 'bandQuality'];
for (let i=0; i<requiredFields.length; i++) {
const field = requiredFields[i];
if (!(field in req.body)) {
const message = `Missing \`${field}\` in request body`
console.error(message);
return res.status(400).send(message);
}
}
const item = Reviews.create(req.body.venueId, req.body.userName, req.body.listeningExperience, req.boy.venueFeel, req.body.musicValue, req.body.bandQuality, req.body.foodQuality, req.body.foodValue, req.body.review);
res.status(201).json(item);
});

// Delete reviews (by id)
router.delete('/:id', (req, res) => {
Reviews.delete(req.params.id);
console.log(`Deleted review with ID: ${req.params.ID}`);
res.status(204).end();
});

// when PUT request comes in with updated review, ensure has
// required fields & that id in url path & in updated item object match.
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['venueId', 'userName', 'listeningExperience', 'venueFeel', 'musicValue', 'bandQuality', 'id'];
for (let i=0; i<requiredFields.length; i++) {
const field = requiredFields[i];
if (!(field in req.body)) {
const message = `Missing \`${field}\` in request body`
console.error(message);
return res.status(400).send(message);
}
}
if (req.params.id !== req.body.id) {
const message = (
`Request path id (${req.params.id}) and request body id `
`(${req.body.id}) must match`);
console.error(message);
return res.status(400).send(message);
}
console.log(`Updating review with ID \`${req.params.id}\``);
const updatedItem = Reviews.update({
id: req.params.id,
userName: req.body.userName, /* This shouldn't change... */
venueId: req.body.venueId, /* Need to update venueId?  It won't change... */
    listeningExperience: req.body.listeningExperience,
    venueFeel: req.body.venueFeel,
    musicValue: req.body.musicValue,
    bandQuality: req.body.bandQuality,
    foodQuality: req.body.foodQuality,
    foodValue: req.body.foodValue,
    review: req.body.review
});
res.status(204).end();
})

module.exports = router;
