"use strict"
const restaurantdb = require('../Models/RestaurantDB');

var restaurantDBObject = new restaurantdb();

function routeRestaurants(app) {
    app.route('/featured-restaurants')
        .get(restaurantDBObject.getFeaturedRestaurantDetails);
}
module.exports = {routeRestaurants};