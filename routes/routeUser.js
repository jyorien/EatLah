"use strict"

const userdb = require('../models/UserDB');

var userDBObject = new userdb();

function routeUsers(app) {
    app.route('/login')
        .post(userDBObject.getLoginCredentials);
}
module.exports = {routeUsers};