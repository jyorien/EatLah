"use strict"

class Restaurant {
    constructor(restaurant_id, restaurant_name, cuisine_id, region_id, restaurant_address, description, phone_number, restaurant_url, operating_hours, min_price, max_price) {
        this. restaurant_id = restaurant_id;
        this.restaurant_name = restaurant_name
        this.cuisine_id = cuisine_id;
        this.region_id = region_id;
        this.restaurant_address = restaurant_address;
        this.description = description;
        this.phone_number = phone_number;
        this.restaurant_url = restaurant_url;
        this.operating_hours = operating_hours;
        this.min_price = min_price;
        this.max_price = max_price;
    }

    getRestaurant_id() {
        return this.restaurant_id;
    }
    getRestaurant_name() {
        return this.restaurant_name;
    }
    getCuisine_id() {
        return this.cuisine_id;
    }
    getRegion_id() {
        return this.region_id;
    }
    getRestaurant_address() {
        return this.restaurant_address;
    }
    getDescription() {
        return this.description;
        
    }
    getPhone_number() {
        return this.phone_number;

    }
    getRestaurant_url() {
        return this.restaurant_url;
    }
    getOperating_hours() {
        return this.operating_hours;
    }
    getMin_price() {
        return this.min_price;
    }
    getMax_price() {
        return this.max_price;
    }

}

module.exports = Restaurant;