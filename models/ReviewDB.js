"use strict";
var db = require('../db-connection');
const Review = require('../models/Review'); 


class reviewDB {
    getReviews(request, respond) {
        var sql = "SELECT review.*, user.username FROM review INNER JOIN user on review.user_id = user.user_id WHERE restaurant_id = ?"
        var id = request.params.id;

        db.query(sql, id, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result)

            }
        });
    }

    addReview(request, respond) {
        var sql = "";
        db.query(sql, function(error, result) {
            var reviewObject = new Review();
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        })
    }
}
module.exports = reviewDB;