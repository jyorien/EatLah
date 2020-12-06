"use strict";
var db = require('../db-connection');

class restaurantDB {
    getFeaturedRestaurantDetails(request,respond) {
        var sql = 'SELECT restaurant.restaurant_name, cuisine.cuisine_name, cuisine.cuisine_color,avg(review.overall_rating) as average FROM restaurant INNER JOIN review ON restaurant.restaurant_id = review.restaurant_id INNER JOIN cuisine ON restaurant.cuisine_id = cuisine.cuisine_id GROUP BY restaurant.restaurant_id ORDER BY avg(review.overall_rating) DESC';
        db.query(sql, function(error,result){
                if(error){
                    throw error;
                }
                else{
                    respond.json(result);
                }
        });


    }
}
module.exports = restaurantDB;
