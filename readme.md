# Venue e-Valuator Capstone
Thinkful Node Capstone

## Background

I built this app because I love live music, and when I am going to a new music venue, I want to be able to find information about the music experience at that venue.  If I am going to a concert in a bar, I want to know what the music experience is like, not how good the food is; if I am going to a concert in a church, I don't need to know how great the sermons are.  This app provides users with information about locations within Washington, DC, which regularly host live music, and allows users to leave music-focused reviews about those locations.
Live preview available at: https://venue-evaluator.herokuapp.com/

## User Story
This app allows users to quickly get information about venues in Washington, DC, that regularly or periodically offer live music.  Users can search for venues by name, venue type, size, and/or whether or not music is typically free.  The app returns a list of venues that meet their criteria; the user can select a venue and get information about that venue, including a photo, map, address, description, and reviews.  User can also post their own review.

As a user, I want to quickly find overviews about music venues in Washington, DC, so that I can determine which venues might be of interest:
![main page wireframe](https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/wireframe.jpg?raw=true)

The main page:
* User sees a header, a quick description of the site, a list of the venues, a map of the venues, and a box for selecting venue preferences.  The page initially lists all venues, in alphabetic order.
* User can opt to filter venues by venue type, venue size, or free vs ticketed.  Each time a filter is changed, the list and map update.
* User can further filter results by entering all or a portion of the venue's name.
* The results list offers a succinct desription of each venue; user can select any venue in the list for more detailed information.
* The user can also select venues by clicking on a map pin.
* When a venue is selected, the venue page opens.

As a user, I want an overview about each venue that interests me so that I can determine if I want to visit that venue, and I want to be able to leave reviews so that I can share my experience with others:
![venue details](https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/venue_detail_wireframe.jpg?raw=true)
* Detailed information about an individual venue includes the venue name, a link to the venue's website, a photo, a map, a description, and user reviews (if applicable).
* Users can leave their own reviews, including providing ratings in pre-selected categories and a text box in which detailed comments can be written.
* When a new review is submitted, the user is brought back to the venue page, and the review is immediately displayed.
* Users can delete or edit reviews after they have been submitted.

## Working Prototye
A live example of the project can be found at: https://venue-evaluator.herokuapp.com/.


Screenshot of landing page:

![landing page screenshot](https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/landing-page-screenshot.jpg?raw=true)

Screenshot of venue page:

![venue page screenshot](https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/venue-page-screenshot.jpg?raw=true)

Screenshot of page for posting a comment:

![comment page screenshot](https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/review-page-screenshot.jpg?raw=true)

## Functionality
This app's functionality includes:
* Gets partial or full list of music venues from database.
* Filters list of music venues based upon user preferences.
* Filters list of venues based upon user-typed entry.
* Gets detailed information about each venue upon user request.
* Allows users to post reviews, with simple click interface for ratings in six categories.
* Allows users to update or delete reviews.

## Technology
* HTML
* CSS
* JavaScript
* jQuery
* Node
* Express
* Mongo


## Responsive
App is built to be responsive across mobile, tablet, laptop, and desktop screen resolutions.
