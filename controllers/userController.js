"use strict";

const User = require('../models/User');
const UserDB = require('../models/UserDB');


// This function authenticates by comparing the input password and password 
// from the database.
function authenticate(request, respond) {
    var input_username = request.body.username; // username from user input
    var input_password = request.body.pw; // password from user input
    var msg = "";

    // Call the getLoginCredentials function from UserDB
    userDB.getLoginCredentials(input_username, function(error, result) {

        if (error) {
            respond.json(error);
        } else {
            // If user can be found, result has one record
            if (result.length > 0) {
                if (input_password == result[0].password) {
                    msg = "10"; // "Success!";
                    console.log(msg);
                } else {
                    msg = "Login Fail!";
                    console.log(msg);
                }
            } else { // If user not found, result has no record
                msg = "User not found!";
            }

            respond.json(prepareMessage(msg));
        }
    });
}
module.exports = {authenticate};