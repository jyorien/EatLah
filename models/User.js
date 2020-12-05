"use strict"
class User {
    constructor(id, fb_id, first_name, last_name, username, password, email, address, gender, mobile_number, user_image) {
        this.id = id;
        this.fb_id = fb_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.gender = gender;
        this.mobile_number = mobile_number;
        this.user_image = user_image;
    }
    getId() {
        return this.id;
    }
    getFb_id() {
        return this.fb_id;
    }
    getFirst_name() {
        return this.first_name
    }
    getLast_name() {
        return this.last_name;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getAddress() {
        return this.address;
    }
    getGender() {
        return this.gender;
    }
    getMobile_number() {
        return this.mobile_number;
    }
    getUser_image() {
        return this.user_image;
    }
}