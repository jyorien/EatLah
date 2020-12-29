"use strict";
var db = require('../db-connection');
const Review = require('../models/Review'); 


class reviewDB {
    getReviews(request, respond) {
        // order by newest reviews
        var sql = "SELECT review.*, user.username, user.user_image FROM review INNER JOIN user on review.user_id = user.user_id WHERE restaurant_id = ? ORDER BY review_id DESC"
        var id = request.params.id;

        db.query(sql, id, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                for (var i=0; i < result.length; i++) {
                    if (result[i].user_image !== 'null' && result[i].user_image != undefined && result[i].user_image != "") {
                        result[i].user_image = Buffer.from(result[i].user_image,'base64').toString('ascii');
                    }
                }

                respond.json(result);
                console.log(sql);

            }
        });
    }

    addReview(request, respond) {

        var now = new Date();
        var hour = now.getHours() % 12;
        var minute = now.getMinutes();
        var date = now.getDate();
        var month = now.getMonth();
        var year = now.getFullYear()
        var am_or_pm = ""
        function format_am_or_pm() {
            if (now.getHours() > 0 && now.getHours() < 12) {
                am_or_pm = 'am'
            }
            else {
                am_or_pm = 'pm'
            }
        }
        function format_minute() {
            if (minute >= 0 && minute < 10) {
                minute = `0${minute}`
            }
        }
        format_am_or_pm();
        format_minute();
        var final_date = `${date}/${month}/${year} ${hour}:${minute} ${am_or_pm}`
        var reviewObject = new Review(null, request.body.user_id,  request.body.restaurant_id, request.body.overall_rating, request.body.food_rating, 
            request.body.service_rating, request.body.value_rating, request.body.review_title, request.body.comment, request.body.will_recommend, final_date.toString());
        var sql = "INSERT INTO eatlah_reviews.review (user_id, restaurant_id, overall_rating, food_rating, service_rating, value_rating, review_title, comment, will_recommend, date_posted) VALUES(?,?,?,?,?,?,?,?,?,?)";
        var values = [reviewObject.user_id, reviewObject.restaurant_id, reviewObject.overall_rating, reviewObject.food_rating, reviewObject.service_rating, reviewObject.value_rating, reviewObject.review_title, reviewObject.comment, reviewObject.will_recommend, reviewObject.date_posted];

        db.query(sql, values, function(error, result) {
            
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
                console.log(sql, values);
            }
        })
    }
    updateReview(request, respond) {
        
        var reviewObject = new Review(request.body.review_id, null, null, request.body.overall_rating, request.body.food_rating, request.body.service_rating, request.body.value_rating, request.body.review_title, request.body.comment,
            request.body.will_recommend, null);
        
        var sql = "UPDATE eatlah_reviews.review SET review_title = ?, comment = ?, overall_rating = ?, food_rating = ?, service_rating = ?, value_rating = ?, will_recommend = ? WHERE review_id = ?";
        var values = [reviewObject.review_title, reviewObject.comment, reviewObject.overall_rating, reviewObject.food_rating, reviewObject.service_rating, reviewObject.value_rating, reviewObject.will_recommend, reviewObject.review_id];
        
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
                console.log(sql, values);
            }

        })

    }
    deleteReview(request, respond) {
        var sql = "DELETE FROM eatlah_reviews.review WHERE review_id = ? "

        db.query(sql, request.body.review_id, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
                console.log(sql, request.body.review_id);
            }
        })
    }
}
module.exports = reviewDB;