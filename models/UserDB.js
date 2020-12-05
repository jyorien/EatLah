"use strict";
var db = require('../db-connection');
const User = require('../Models/User');

class userDB{
    
    getLoginCredentials(request, respond){
       var username = request.body.username;
       var password = request.body.password;
       console.log(username,password);
       var msg = "";

       var sql = "SELECT password FROM user WHERE username = ?";

        db.query(sql, [username], function(error, result) {
            if(error){
                throw error;
            }
            else{
                if(result.length > 0){
                    if(password == result[0].password){
                        msg = "1";
                        console.log(msg);
                    }
                    else{
                        msg = "FAIL!";
                        console.log(msg);
                    }
                }
                else{
                    msg = "USER NOT FOUND!";
                    console.log(msg);
                    
                    
                }
                respond.json(prepareMessage(msg));
            }
          });
    }

    getAllUsers(request, respond){
        var sql = "SELECT * FROM eatlah_restaurant_review.user";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

     updateUserFirstName(request, respond){
       
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