"use strict";
var db = require('../db-connection');

class restaurantDB {
    getFeaturedRestaurantDetails(request,respond) {
        var sql = 'SELECT restaurant.restaurant_id, restaurant.restaurant_name, restaurant.featured_url, cuisine.cuisine_name, cuisine.cuisine_color,avg(review.overall_rating) as average FROM restaurant INNER JOIN review ON restaurant.restaurant_id = review.restaurant_id INNER JOIN cuisine ON restaurant.cuisine_id = cuisine.cuisine_id GROUP BY restaurant.restaurant_id ORDER BY avg(review.overall_rating) DESC LIMIT 8';
        db.query(sql, function(error,result){
                if (error){
                    throw error;
                }
                else {
                    respond.json(result);
                }
        });
    }
    getRestaurantDetails(request,respond) {
        var sql = 'SELECT * FROM restaurant INNER JOIN cuisine ON restaurant.cuisine_id = cuisine.cuisine_id WHERE restaurant_id = ?';
        var id = request.params.id;
        db.query(sql, id, function(error,result) {
            if (error){
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getSearchResults(request,respond) {
        var sql = ""
        var values = []
        var search_query = request.params.search_query
        var region_query = request.params.region;
        var cuisine_query = request.params.cuisine;

        // if there is only text search
        if (region_query == 'region' && cuisine_query == 'cuisine') {
            search_query = `%${request.params.search_query}%`;
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE restaurant.restaurant_name LIKE ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [search_query]
        }
        // if there is text and region search
        else if (cuisine_query == 'cuisine') {
            region_query = `${request.params.region}`
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE restaurant.restaurant_name LIKE ? AND region.region_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [search_query, region_query]
        }
        // if there is only cuisine search
        else if (region_query == 'region' && search_query == 'search') {
            cuisine_query = `${request.params.cuisine}`
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE cuisine.cuisine_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [cuisine_query]
    

        }
        // if there is only regions search
        else if (cuisine_query == 'cuisine' && search_query == 'search') {
            region_query = `${request.params.region}`
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE region.region_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [region_query]

        }
        
        db.query(sql, values, function(error ,result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result)
            }
        })
        

    }
}
module.exports = restaurantDB;
