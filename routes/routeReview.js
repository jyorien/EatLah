"use strict"

const reviewdb = require('../models/ReviewDB');

var reviewDBObject = new reviewdb();

function routeReviews(app) {
    app.route('/reviews/:id')
        .get(reviewDBObject.getReviews);
    app.route('/reviews')
        .post(reviewDBObject.addReview)
        .put(reviewDBObject.updateReview)
        .delete(reviewDBObject.deleteReview);
}
module.exports = {routeReviews};