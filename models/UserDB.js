"use strict";
var db = require('../db-connection');
const User = require('../Models/User');

class userDB{
    
    getLoginCredentials(request, respond){
       var username = request.body.username;
       var password = request.body.password;
       console.log(username,password);
       var msg = "";

       var sql = "SELECT password, user_id, username FROM user WHERE username = ?";

        db.query(sql, [username], function(error, result) {
            if(error){
                throw error;
            }
            else{
                if(result.length > 0){
                    if(password == result[0].password){
                        msg = "1";
                        console.log(msg);
                        respond.json([result[0].user_id, result[0].username]);
                    }
                    else{
                        msg = "FAIL!";
                        console.log(msg);
                        respond.json(prepareMessage(msg));
                    }
                }
                else{
                    msg = "USER NOT FOUND!";
                    console.log(msg);
                    respond.json(prepareMessage(msg));
                    
                    
                }
                
            }
          });
    }

    addNewAccount(request, respond) {
        console.log(request.body)
        var first_name = request.body.first_name;
        var last_name = request.body.last_name;
        var username = request.body.username;
        var gender = request.body.gender;
        var address = request.body.address;
        var email = request.body.email;
        var mobile_number = request.body.mobile_number;
        var password = request.body.password;

        var sql = "INSERT INTO eatlah_reviews.user (first_name, last_name, username, password, email, address, gender, mobile_number) VALUES (?,?,?,?,?,?,?,?)"
        var values = [first_name, last_name, username, password, email, address, gender, mobile_number]
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

    getUsername(request,respond) {
        var username = request.params.username;
        var msg = ""
        var sql = "SELECT * FROM user WHERE username = ?"
        db.query(sql, username, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length > 0) {
                    msg = "Username is already taken, please enter a new username."
                    respond.json(prepareMessage(msg))
                    console.log(sql, username)
                    return
                    
                }
                else {
                    msg ="1"
                    respond.json(prepareMessage(msg))
                    console.log(sql, username)
                }
            }
        })
        

    }

     updateUserFirstName(request, respond) {
       
        var userObject = new User(request.params.username, request.body.firstname);

        var sql = "UPDATE eatlah_restaurant_review.user SET first_name = ? WHERE username = ?";
        var values = [userObject.getFirstName(), userObject.getUserId()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    

}
function prepareMessage(msg){
    var obj = {"message": msg};
    return obj;
}

module.exports = userDB;