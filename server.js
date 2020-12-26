"use strict";

const express = require("express");
const routeUser = require('./routes/routeUser');
const routeRestaurant = require('./routes/routeRestaurant');
const routeReview = require('./routes/routeReview');
const routeFavourites = require("./routes/routeFavourites");

const bodyParser = require("body-parser");

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeUser.routeUsers(app);
routeRestaurant.routeRestaurants(app);
routeReview.routeReviews(app);
routeFavourites.routeFavourites(app);


function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});