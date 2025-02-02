"use strict";
var db = require('../db-connection');
const User = require('../Models/User');

class userDB{
    
    getLoginCredentials(request, respond){
       var username = request.body.username;
       var password = request.body.password;
       console.log(username,password);
       var msg = "";

       var sql = "SELECT password, user_id, username, user_image FROM user WHERE username = ?";

        db.query(sql, [username], function(error, result) {
            if(error){
                throw error;
            }
            else{
                if(result.length > 0){
                    if(password == result[0].password){
                        msg = "1";
                        console.log(msg);
                        if (result[0].user_image !== 'null' && result[0].user_image != undefined && result[0].user_image != "") {
                            result[0].user_image = Buffer.from(result[0].user_image,'base64').toString('ascii');
                        }
                            
                        respond.json([result[0].user_id, result[0].username, result[0].user_image]);
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

    addNewUser(request, respond) {
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

    updateUserDetails(request, respond) {
        var user_id = request.params.id;
        var first_name = request.body.first_name;
        var last_name = request.body.last_name;
        var gender = request.body.gender;
        var address = request.body.address;
        var email = request.body.email;
        var mobile_number = request.body.mobile_number;
        var file_base64 = request.body.file;
        var password = request.body.password
        var sql;
        var values;

        if (file_base64 !== undefined && file_base64 != "") {
           sql = "UPDATE user SET user_image = ? WHERE user_id = ?"
            values = [file_base64, user_id]
            
        }
        else if (password !== undefined && password != "") {
            sql = "UPDATE user SET password = ? WHERE user_id = ?"
            values = [password, user_id]
        }
        else {

        sql = "UPDATE user SET first_name = ?, last_name = ?, email = ?, address = ?, gender = ?, mobile_number = ? WHERE user_id = ?"
        values = [first_name, last_name, email, address, gender, mobile_number, user_id]
        }
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        }) 
        console.log(sql, values)
        
    }

    getUserInfo(request, respond) {
        var user_id = request.params.id;
        var sql = "SELECT * FROM user WHERE user_id = ?";
        db.query(sql, user_id, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result[0].user_image !== 'null' && result[0].user_image != undefined && result[0].user_image != "") {
                    result[0].user_image = Buffer.from(result[0].user_image,'base64').toString('ascii');
                }
                
                respond.json(result);
            }
        })
        
    }

    deleteUser(request, respond) {
        var user_id = request.params.id;
        var sql = "DELETE from user WHERE user_id = ?";
        db.query(sql, user_id, function(error,result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        })
    }


    

}
function prepareMessage(msg){
    var obj = {"message": msg};
    return obj;
}

module.exports = userDB;