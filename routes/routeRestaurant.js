"use strict"
const restaurantdb = require('../models/RestaurantDB');

var restaurantDBObject = new restaurantdb();

function routeRestaurants(app) {
    app.route('/featured-restaurants')
        .get(restaurantDBObject.getFeaturedRestaurantDetails);
    app.route('/restaurants/:id')
        .get(restaurantDBObject.getRestaurantDetails);   
    app.route('/search-restaurants/:search_query/:region/:cuisine')
        .get(restaurantDBObject.getSearchResults);
        
}   

module.exports = {routeRestaurants};