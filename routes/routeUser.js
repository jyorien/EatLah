"use strict"

const userdb = require('../models/UserDB');

var userDBObject = new userdb();

function routeUsers(app) {
    app.route('/login')
        .post(userDBObject.getLoginCredentials);
    app.route('/sign-up')
        .post(userDBObject.addNewAccount)
    app.route('/sign-up/:username')
        .get(userDBObject.getUsername)
}
module.exports = {routeUsers};