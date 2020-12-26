"use strict"

const userdb = require('../models/UserDB');

var userDBObject = new userdb();

function routeUsers(app) {
    app.route('/login')
        .post(userDBObject.getLoginCredentials);
    app.route('/sign-up')
        .post(userDBObject.addNewUser)
    app.route('/sign-up/:username')
        .get(userDBObject.getUsername)
    app.route('/user/:id')
        .put(userDBObject.updateUserDetails)
        .get(userDBObject.getUserInfo)
        .delete(userDBObject.deleteUser)
}
module.exports = {routeUsers};