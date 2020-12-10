"use strict"
const restaurantdb = require('../models/RestaurantDB');

var restaurantDBObject = new restaurantdb();

function routeRestaurants(app) {
    app.route('/featured-restaurants')
        .get(restaurantDBObject.getFeaturedRestaurantDetails);
    app.route('/restaurant/:id')
        .get(restaurantDBObject.getRestaurantDetails);    
        
}   

module.exports = {routeRestaurants};