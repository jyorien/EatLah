class Review {
    constructor(review_id, user_id, restaurant_id, overall_rating, food_rating, service_rating, value_rating, review_title, comment, will_recommend, date_posted ) {
    this.review_id = review_id;
    this.user_id = user_id;
    this.restaurant_id = restaurant_id;
    this.overall_rating = overall_rating;
    this.food_rating = food_rating;
    this.service_rating = service_rating;
    this.value_rating = value_rating;
    this.review_title = review_title
    this.comment = comment;
    this.will_recommend = will_recommend;
    this.date_posted = date_posted; 
}

    getReview_id() {
        return this.review_id;
    }
    getUser_id() {
        return this.user_id;
    }
    getRestaurant_id() {
        return this.restaurant_id;
    }
    getOverall_rating() {
        return this.overall_rating;
    }
    getFood_rating() {
        return this.food_rating;
    }
    getService_rating() {
        return this.service_rating;
    }
    getValue_rating() {
        return this.value_rating;
    }
    getReview_title() {
        return this.review_title;
    }
    getComment() {
        return this.comment;
    }
    getWill_recommend() {
        return this.will_recommend;
    }
    getDate_posted() {
        return this.date_posted;
    }

    setReview_id() {
        this.review_id = this.review_id;
    }
    setUser_id() {
        this.user_id = user_id;
    }
    setRestaurant_id() {
        this.restaurant_id = this.restaurant_id;
    }
    setOverall_rating() {
        this.overall_rating = this.overall_rating;
    }
    setFood_rating() {
        this.food_rating = this.food_rating;
    }
    setService_rating() {
        this.service_rating = this.service_rating;
    }
    setValue_rating() {
        this.value_rating = this.value_rating;
    }
    setReview_title() {
        this.review_title = this.review_title;
    }
    setComment() {
        this.comment = this.comment;
    }
    setWill_recommend() {
        this.will_recommend = this.will_recommend;
    }
    setDate_posted() {
        this.date_posted = this.date_posted;
    }
    

}
module.exports = Review;