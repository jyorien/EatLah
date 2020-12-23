"use strict";
var db = require('../db-connection');

class restaurantDB {
    getFeaturedRestaurantDetails(request,respond) {
        var sql = `SELECT restaurant.restaurant_id, restaurant.restaurant_name, restaurant.featured_url, cuisine.cuisine_name, cuisine.cuisine_color,avg(review.overall_rating) as average FROM restaurant 
        INNER JOIN review ON restaurant.restaurant_id = review.restaurant_id 
        INNER JOIN cuisine ON restaurant.cuisine_id = cuisine.cuisine_id 
        GROUP BY restaurant.restaurant_id 
        ORDER BY avg(review.overall_rating) 
        DESC LIMIT 8`;
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
        var sql = `SELECT restaurant.*, cuisine.cuisine_color, cuisine.cuisine_name, avg(review.overall_rating) as average_overall, avg(review.food_rating) as average_food, avg(review.service_rating) as average_service, avg(review.value_rating) as average_value, count(review.review_id) as total_reviews FROM restaurant
        INNER JOIN review ON restaurant.restaurant_id = review.restaurant_id 
        INNER JOIN cuisine ON restaurant.cuisine_id = cuisine.cuisine_id 
        WHERE restaurant.restaurant_id = ?
        GROUP BY restaurant.restaurant_id `;
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
        var search_query = request.body.text_search;
        var region_query = request.body.region;
        var cuisine_query = request.body.cuisine;
        console.log(request.body)
        console.log(search_query, region_query, cuisine_query)
        // if there is only regions search
        if (typeof(search_query) === 'undefined' && typeof(cuisine_query) === 'undefined') {
            region_query = `${region_query}`
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE region.region_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [region_query]
            console.log("help")

        }

        // if there is only cuisine search
        else if (typeof(search_query) === 'undefined' && typeof(region_query) === 'undefined') {
            console.log("hello")
            cuisine_query = `${request.body.cuisine}`
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE cuisine.cuisine_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [cuisine_query]

        }
        // if there is only text search
        else if (typeof(region_query) === 'undefined' && typeof(cuisine_query) === 'undefined') {
            search_query = `%${search_query}%`;
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
        else if (typeof(cuisine_query) === 'undefined') {
            search_query = `%${search_query}%`
            region_query = `${region_query}`
            
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE restaurant.restaurant_name LIKE ? AND region.region_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [search_query, region_query]
        }

        // if there is region and cuisine search
        else if (typeof(search_query) === 'undefined') {
            cuisine_query = `${cuisine_query}`
            region_query = `${region_query}`
            
            sql = `SELECT restaurant.*, region.region_name, cuisine.*, count(review.review_id) as total_reviews, avg(review.overall_rating) as average FROM eatlah_reviews.restaurant
            INNER JOIN eatlah_reviews.region ON restaurant.region_id = region.region_id
            INNER JOIN eatlah_reviews.cuisine ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN eatlah_reviews.review ON restaurant.restaurant_id = review.restaurant_id
            WHERE region.region_name = ? AND cuisine.cuisine_name = ?
            GROUP BY restaurant.restaurant_id
            ORDER BY avg(review.overall_rating) DESC`
            values = [region_query, cuisine_query]
        }
        
        
        
        
        db.query(sql, values, function(error ,result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result)
                console.log(sql,values)
            }
        })
        

    }
}
module.exports = restaurantDB;
