"use strict"

const reviewdb = require('../models/ReviewDB');

var reviewDBObject = new reviewdb();

function routeReviews(app) {
    app.route('/reviews/:id')
        .get(reviewDBObject.getReviews);
}
module.exports = {routeReviews};