"use strict";
var db = require('../db-connection');

class favouritesDB {
    addNewFavourite(request, respond) {
        var user_id = request.body.user_id;
        var restaurant_id = request.body.restaurant_id;

        var sql = `INSERT INTO favourite (user_id, restaurant_id) VALUES (?,?)`
        var values = [user_id, restaurant_id]

        db.query(sql, values, function(error,result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        })
    }

    getUserFavourites(request, respond) {
        var user_id = request.params.id;

        var sql = `SELECT restaurant.*, cuisine.cuisine_name, cuisine.cuisine_color FROM favourite
            INNER JOIN restaurant ON favourite.restaurant_id = restaurant.restaurant_id
            INNER JOIN cuisine ON restaurant.cuisine_id = cuisine.cuisine_id 
            WHERE user_id = ?`;

        db.query(sql, user_id, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
                console.log(sql, user_id)
            }
        })
    }

    deleteFavourite(request, respond) {
        var user_id = request.body.user_id;
        var restaurant_id = request.body.restaurant_id;
        var sql = `DELETE FROM favourite WHERE user_id = ? AND restaurant_id = ? `;
        var values = [user_id, restaurant_id];

        db.query(sql, values, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result)
                console.log(sql, values)
            }
        })
    }


}
module.exports = favouritesDB;