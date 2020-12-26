"use strict"

const favouritesdb = require('../models/FavouritesDB');

var favouritesDBObject = new favouritesdb();

function routeFavourites(app) {
    app.route('/favourites')
        .post(favouritesDBObject.addNewFavourite)
        .delete(favouritesDBObject.deleteFavourite)
    app.route('/favourite/:id')
        .get(favouritesDBObject.getUserFavourites)
}

module.exports = {routeFavourites};