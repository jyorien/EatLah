//const { request } = require("http");

comments_array=[]
comments_count = 0;
var percentage_recommend = 0;
var average_overall;
var total_reviews;
var user_overall;
var user_food;
var user_service;
var user_value;
var address;

function retrieveInfo () {
    var name = sessionStorage.getItem('restaurant_name');
    address = sessionStorage.getItem('restaurant_address');
    var description = sessionStorage.getItem('restaurant_description');
    
    console.log(description)
    var contact_number = sessionStorage.getItem('restaurant_number');
    var url = sessionStorage.getItem('restaurant_url');
    var operating_hours = sessionStorage.getItem('restaurant_hours');
    var cuisine = sessionStorage.getItem('restaurant_cuisine');
    var cuisine_color = sessionStorage.getItem('restaurant_cuisine_color');
    var image_url = sessionStorage.getItem('image_url');
    average_overall = sessionStorage.getItem('average_overall');
    var average_food = parseFloat(sessionStorage.getItem('average_food')).toFixed(1);
    var average_service = parseFloat(sessionStorage.getItem('average_service')).toFixed(1);
    var average_value = parseFloat(sessionStorage.getItem('average_value')).toFixed(1);
    total_reviews = sessionStorage.getItem('total_reviews');

    document.getElementById('res_name').innerHTML = name;
    document.getElementById('res_cuisine').innerHTML = cuisine;
    document.getElementById('res_badge').style.backgroundColor = cuisine_color;
    document.getElementById('total_reviews').innerHTML = total_reviews;
    document.getElementById('description').innerHTML = description;
    document.getElementById('average_food_rating').innerHTML = average_food;
    document.getElementById('average_service_rating').innerHTML = average_service;
    document.getElementById('average_value_rating').innerHTML = average_value;
    document.getElementById('res_address').innerHTML = address;
    if (contact_number != 'null') {
        document.getElementById('res_number').innerHTML = contact_number;
    }
    else {
        document.getElementById('res_number').innerHTML = 'N/A';
    }
    
    document.getElementById('res_url').innerHTML += url;
    document.getElementById('res_url').setAttribute("href", url)
    document.getElementById('res_url').setAttribute("target", "_blank")

    if (operating_hours != 'null') {
        document.getElementById('res_hours').innerHTML = operating_hours;
    }
    else {
        document.getElementById('res_hours').innerHTML = 'N/A';
    }
    document.getElementById('res_image').setAttribute('src',image_url)


    
    
}


function retrieveComments() {
    var request = new XMLHttpRequest();
    var id = sessionStorage.getItem('restaurant_id');
    var request_url = '/reviews/'+id;

    request.open('GET', request_url, true);
    request.onload = function() {
        comments_array = JSON.parse(request.responseText);
        var will_recommend = 0
        for (var i = 0; i < comments_array.length; i++) {
            if (comments_array[i].will_recommend === 1) {
                will_recommend+=1
            }
        }
        percentage_recommend = will_recommend / comments_array.length * 100;
        if (percentage_recommend == 100 || percentage_recommend == 0) {
            percentage_recommend = percentage_recommend + '%'
        }
        else {
            percentage_recommend = percentage_recommend.toFixed(1) + '%'
        }
        document.getElementById('recommend').innerHTML = percentage_recommend;

        

        console.log(comments_array);

        displayComments(3);
    }
    request.send();
}

// called when page is loaded
function displayComments(number) {
    var section = document.getElementById('commentSection');
    section.innerHTML = "";
    comments_count = number;

    for (var i = 0; i < comments_count; i++) {
        console.log(i)
        console.log(comments_array[i])
        var review_id = comments_array[i].review_id;
        var review_title = comments_array[i].review_title;
        var comment = comments_array[i].comment;
        var date_posted = comments_array[i].date_posted;
        var overall_rating = comments_array[i].overall_rating;
        var food_rating = comments_array[i].food_rating;
        var service_rating = comments_array[i].service_rating;
        var value_rating = comments_array[i].value_rating;
        var username = comments_array[i].username;
        var will_recommend = comments_array[i].will_recommend;
        var user_image = comments_array[i].user_image;
        if (typeof(user_image) == 'object') {
            user_image = 'images/avatar.png'
        }
        
    


        // TODO: format the comments 
        var cell = `<div class="comment row" id=${review_id}> 
        <div class="col-2" style="text-align: center; padding-top: 10px">
        <img src="${user_image}" style="border-radius: 50%; width: 60px; max-width:60px; object-fit: cover;">
        <span style="padding-bottom: 10px; width:230px; max-width: 230px;"> ${username} </span><br>`
        if (will_recommend == 1) {
            console.log("rec " + will_recommend)
            cell += `<i class="fa fa-thumbs-o-up"> </i>`
        }

        else {
            console.log("rec " + will_recommend)
            cell += `<i class="fa fa-thumbs-o-down"> </i>`
        }
        cell+=`</div>

        <div class="col-10">
        <h5 style="display:inline-block; width: 300px; max-width: 300px;"> ${review_title} </h5>
        <span style="display: inline-block; padding-left: 20px;"> ${date_posted} </span>

        <span id="star_${review_id}"style="display: block">`

        for (var j = 0; j < overall_rating; j++ ) {
            var star = `<i class="pink-star fa fa-star" ></i>`;
            cell+= star;
        }
        if (5-overall_rating != 0) {
            for (var k = 0; k < 5-overall_rating; k++) {
                var star = `<i class="grey-star fa fa-star" ></i>`;
                cell+=star;
            }
            
        }
        cell+=`</span>
        <div> 

            <i> Food </i> <i>`+ food_rating + `</i> 
            <i> Service </i> <i>` + service_rating + `</i> 
            <i> Value </i> <i>`+ value_rating +` </i> `

        if (comment != null && comment != "") {
            cell += ` <div style="padding-top: 20px"> <span class="review-comment">` + comment + `</span> </div>`
        }
        

        if (username == localStorage.getItem('user_name')) {
            var modify_butttons = `<span class="modify-buttons"> 
                <a href="#" data-toggle="modal" data-target="#edit_review" onclick="edit_review(`+ i +`)"> Edit </a>
                <a href="#" onclick="delete_review(this)"style="padding-left: 5px;"> Delete </a>
                </span>
            </div>` 
            cell+= modify_butttons;

        }
        else {
            var div = `</div> </div>`
            cell += div;
        }


        section.insertAdjacentHTML('beforeend', cell); 



    }
    if (comments_array.length > 3 && comments_count != comments_array.length) {
        var see_more = `<a class="see-more" onclick="displayComments(comments_array.length)"> Show more reviews... </a>`
        section.insertAdjacentHTML('beforeend', see_more); 
    }

}


function load_sorted(type) {
    sort_reviews(type)
    displayComments(3);
}

function sort_reviews(type) {
    if (type == 'highest') {
        comments_array.sort(function(a, b) {
            console.log(comments_array)
            return b.overall_rating - a.overall_rating || b.food_rating - a.food_rating || b.service_rating - a.service_rating || b.value_rating - a.value_rating;
        });
    }

    else if (type == 'lowest'){
        comments_array.sort(function(a, b) {
            console.log(comments_array)
            return a.overall_rating - b.overall_rating || a.food_rating - b.food_rating || a.service_rating - b.service_rating || a.value_rating - b.value_rating;
    }); 
    }

    else if (type == 'newest') {
        comments_array.sort(function(a, b) {
            return b.review_id - a.review_id;
        });
    }
        
}

function display_stars() {
    console.log(average_overall)
    var overall_ratings = document.getElementById('overall_ratings');
    var rating = average_overall;
    var star;
    for (var i = 0; i < average_overall; i++) {
        if (rating > 1) {
            star = `<i class="pink-star fa fa-star" ></i>`
            rating -=1;
            console.log(rating)
             
        }
        else if(rating % 1 != 0){
            if (rating > 0 && rating <= 0.25 ) {
                console.log(rating)
                star = `<i class="quarter-star fa fa-star" ></i>`;
            }
            else if (rating > 0.25 && rating <= 0.50) {
                star = `<i class="half-star fa fa-star" ></i>`
            }
            else if (rating > 0.50 && rating < 1) {
                star = `<i class="three-quarter-star fa fa-star" ></i>`
            }
            rating -= rating;
            //console.log(rating)
            
        }
        
        overall_ratings.insertAdjacentHTML('beforeend', star); 
    }

    if (Math.ceil(5-average_overall) != 0 ) {
            var star_count = Math.floor(5-average_overall);
            for (var i = 0; i < star_count; i++) {
                star = `<i class="grey-star fa fa-star" ></i>`
                overall_ratings.insertAdjacentHTML('beforeend', star); 
            }

    }
    overall_number = `<div id='average_overall_rating1' style="display: inline; font-size: 18px; padding-left: 10px;">`+ parseFloat(average_overall).toFixed(1) +`</div>`
    overall_ratings.insertAdjacentHTML('beforeend', overall_number)
    console.log(rating)
}
// set attributes for write a review button and add to favourites button
function set_button_attributes() {
    btn_review = document.getElementById('btn_review');
    btn_favourite = document.getElementById('btn_favourite');
    if (localStorage.getItem('user_name') != null && localStorage.getItem('user_name') != "") {
        btn_review = document.getElementById('btn_review');
        btn_review.dataset.toggle = 'modal';
        btn_review.dataset.target = '#new_review'
    }

    else {
        btn_review.setAttribute('onclick', "alert('You must be logged in to write a review!')")
        btn_favourite.setAttribute('onclick',"alert('You must be logged in to add this restaurant to favourites!')")
    }
} 

function star_ratings(element) {
    var rating_value = element.getAttribute("value");
    console.log('rating value: '+ rating_value)
    var class_names = ["rating-stars-overall", "rating-stars-food", "rating-stars-service", "rating-stars-value"]
    var rating_class;

    if (element.classList.contains(class_names[0])) {
        rating_class = class_names[0];
        console.log("rating class: "+ rating_class)
    }
    else if (element.classList.contains(class_names[1])) {
        rating_class = class_names[1];
        console.log("rating class: "+ rating_class)
    }
    else if (element.classList.contains(class_names[2])) {
        rating_class = class_names[2];
        console.log("rating class: "+ rating_class)
    }

    else if (element.classList.contains(class_names[3])) {
        rating_class = class_names[3];
        console.log("rating class: "+ rating_class)
    }
    var stars = document.getElementsByClassName(rating_class);
    var classTarget = "." + rating_class;
    

    for (let star of stars){
        star.className = "grey-star fa fa-star " + rating_class;
        console.log('grey star')
    }
    changeStarColour(rating_value, classTarget, rating_class, class_names);
}

function changeStarColour(num, classTarget, rating_class, class_names) {
    console.log("class target: " +classTarget);
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").className = "pink-star fa fa-star " + rating_class;
            if (rating_class == class_names[0]) {
                user_overall = 1;
            }
            else if (rating_class == class_names[1]) {
                user_food = 1;
            }
            else if (rating_class == class_names[2]) {
                user_service = 1;
            }
            else if (rating_class == class_names[3]) {
                user_value = 1;
            }   

            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='2']").className = "pink-star fa fa-star " + rating_class;
            if (rating_class == class_names[0]) {
                user_overall = 2;
            }
            else if (rating_class == class_names[1]) {
                user_food = 2;
            }
            else if (rating_class == class_names[2]) {
                user_service = 2;
            }
            else if (rating_class == class_names[3]) {
                user_value = 2;
            }  
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='2']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='3']").className = "pink-star fa fa-star " + rating_class;
            if (rating_class == class_names[0]) {
                user_overall = 3;
            }
            else if (rating_class == class_names[1]) {
                user_food = 3;
            }
            else if (rating_class == class_names[2]) {
                user_service = 3;
            }
            else if (rating_class == class_names[3]) {
                user_value = 3;
            }  
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='2']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='3']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='4']").className = "pink-star fa fa-star " + rating_class;
            if (rating_class == class_names[0]) {
                user_overall = 4;
            }
            else if (rating_class == class_names[1]) {
                user_food = 4;
            }
            else if (rating_class == class_names[2]) {
                user_service = 4;
            }
            else if (rating_class == class_names[3]) {
                user_value = 4;
            }  
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='2']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='3']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='4']").className = "pink-star fa fa-star " + rating_class;
            document.querySelector(classTarget + "[value='5']").className = "pink-star fa fa-star " + rating_class;
            if (rating_class == class_names[0]) {
                user_overall = 5;
            }
            else if (rating_class == class_names[1]) {
                user_food = 5;
            }
            else if (rating_class == class_names[2]) {
                user_service = 5;
            }
            else if (rating_class == class_names[3]) {
                user_value = 5;
            }  
            break;
    }
    console.log("overall " + user_overall + " food " + user_food + " service " + user_service + " value " + user_value)
}

function add_review() {

    var review_object = new Object();
    var recommend = document.getElementsByName('recommend');
    var recommend_value;
    for (var i = 0; i < recommend.length; i++) {
        if (recommend[i].checked) {
            recommend_value = recommend[i].value
            break;
            //console.log("recommend: " +recommend_value);
        }
    }
    
    review_object.user_id = localStorage.getItem('user_id');
    review_object.restaurant_id = sessionStorage.getItem('restaurant_id');
    var user_title = document.getElementById('user_title').value;
    console.log("title: " +user_title)
    var user_comment = document.getElementById('user_comment').value;
    console.log("object: " + JSON.stringify(review_object))
    if (typeof(user_overall) === 'undefined' || typeof(user_food) === 'undefined' || typeof(user_service) === 'undefined' || typeof(user_value) === 'undefined' || user_title == '' || typeof(recommend_value) === 'undefined' ) {
        alert("Please fill in the fields!")
        console.log('recc ' +  recommend_value)
        return

    }
    review_object.review_title = review_title_value = user_title;
    review_object.comment = user_comment;
    review_object.overall_rating = user_overall;
    review_object.food_rating = user_food;
    review_object.value_rating = user_value;
    review_object.service_rating = user_service;
    review_object.will_recommend = recommend_value;
    console.log("object: " + JSON.stringify(review_object))

    var request = new XMLHttpRequest();
    request.open('POST', '/reviews', true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
            sessionStorage.setItem("total_reviews", parseInt(total_reviews) + 1)
            getRestaurantDetails()
            location.reload();
            
            
            
    }
    request.send(JSON.stringify(review_object));
    

}

function getRestaurantDetails() {
     var request = new XMLHttpRequest();
     var url = `/restaurants/${sessionStorage.getItem('restaurant_id')}`;
     request.open('GET', url, true);
     request.onload = function() {
        var info_array = JSON.parse(request.responseText);
        sessionStorage.setItem('average_overall', info_array[0].average_overall);
        sessionStorage.setItem('average_food', info_array[0].average_food);
        sessionStorage.setItem('average_service', info_array[0].average_service);
        sessionStorage.setItem('average_value', info_array[0].average_value);
     }
     request.send();
}

function edit_review(index) {
    // TODO 
    console.log(comments_array[index])
    var edit_overall = document.getElementById("edit_overall");
    var edit_food = document.getElementById("edit_food");
    var edit_service = document.getElementById("edit_service");
    var edit_value = document.getElementById("edit_value");
    var edit_title = document.getElementById("user_title_update");
    var edit_comment = document.getElementById("user_comment_update");
    var edit_id = document.querySelector(".id_placeholder");
    
    console.log("will recommend: " + comments_array[index].will_recommend)

    edit_overall.value = comments_array[index].overall_rating;
    edit_food.value = comments_array[index].food_rating;
    edit_service.value = comments_array[index].service_rating;
    edit_value.value = comments_array[index].value_rating;
    edit_title.value = comments_array[index].review_title;
    edit_comment.value = comments_array[index].comment;
    edit_id.setAttribute("id", comments_array[index].review_id);

    if (comments_array[index].will_recommend == 1 ) {
        document.getElementById("btn-yes-update").click();
    }
    else {
        document.getElementById("btn-no-update").click();
    }

   
}



function delete_review(element) {
    var response = confirm("Are you sure you want to delete this comment?");
    if (response === true) {
        delete_object = new Object();
        // get id of review
        delete_object.review_id = element.parentNode.parentNode.parentNode.parentNode.id;
    
        var request = new XMLHttpRequest();
        request.open('DELETE', '/reviews', true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function() {
                sessionStorage.setItem("total_reviews", parseInt(total_reviews) - 1);
                getRestaurantDetails();
                location.reload();
        }
        request.send(JSON.stringify(delete_object));
    }

}

function update_review() {
    
    var response = confirm("Are you sure you want to save changes?")
    if (response === true) {
        var recommend = document.getElementsByName('update_recommend');
        var recommend_value;
        for (var i = 0; i < recommend.length; i++) {
            if (recommend[i].checked) {
                recommend_value = recommend[i].value
                break;
            }
        }


        update_object = new Object();
        update_object.review_id = document.querySelector(".id_placeholder").getAttribute('id');
        update_object.overall_rating = document.getElementById("edit_overall").value;
        update_object.food_rating = document.getElementById("edit_food").value;
        update_object.service_rating = document.getElementById("edit_service").value;
        update_object.value_rating = document.getElementById("edit_value").value;
        update_object.review_title = document.getElementById("user_title_update").value;
        update_object.comment = document.getElementById("user_comment_update").value;
        update_object.will_recommend = recommend_value;
        

        var request = new XMLHttpRequest();
        request.open('PUT', '/reviews', true)
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function() {
                location.reload();
        }
        request.send(JSON.stringify(update_object));
    }

}


var coordinates;
// geocoding function
function geocode() {
    var location = address;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: 'AIzaSyBkKFpDIZcEtgeEcoad8QUBZPDozuE8z8w'
        }
      })
      .then(function(response) {
        // Log full response
        console.log(response)

        // Formatted Address
        coordinates = response.data.results[0].geometry.location;
        console.log(coordinates)

        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkKFpDIZcEtgeEcoad8QUBZPDozuE8z8w&callback=initMap&libraries=&v=weekly'
        script.setAttribute('defer', 'defer');
        document.body.appendChild(script);
      })
      .catch(function(error) {
        console.log(error)
      })
}

function initMap() {
    var options = {
      zoom: 16,
      center: coordinates
    }

    // init map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // add marker
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map
    })

  } 

  function add_or_delete_favourites() {
    // check if restaurant is already in user favourites
    var request = new XMLHttpRequest();
    var url = `/favourite/${localStorage.getItem('user_id')}`
    request.open("GET", url ,true)
    request.onload = function() {
        var res_array = JSON.parse(request.responseText);

        for (var i = 0; i < res_array.length; i++) {
            if (res_array[i].restaurant_id == sessionStorage.getItem('restaurant_id')) {
                delete_favourites();
                console.log(res_array);
                return
            }
        }
        add_favourites();
        console.log(res_array);
    }
    request.send();      
  }

function add_favourites() {
    var fav_object = new Object();
    fav_object.user_id = localStorage.getItem("user_id");
    fav_object.restaurant_id = sessionStorage.getItem("restaurant_id");
    var request = new XMLHttpRequest();
    request.open('POST', '/favourites', true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
        get_favourites();
    }
    request.send(JSON.stringify(fav_object));
  }

function delete_favourites() {
    var response = confirm("Are you sure you want to remove this restaurant from favourites?");
    if (response === true) {
        var fav_object = new Object();
        fav_object.user_id = localStorage.getItem("user_id");
        fav_object.restaurant_id = sessionStorage.getItem("restaurant_id");
    
        var request = new XMLHttpRequest();
        request.open('DELETE', '/favourites', true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function() {
            get_favourites();
        }
        request.send(JSON.stringify(fav_object));
    }

  }

function get_favourites() {
    // check if restaurant is already in user favourites
    var request = new XMLHttpRequest();
    var url = `/favourite/${localStorage.getItem("user_id")}`
    request.open('GET', url, true);
    request.onload = function() {
        var res_array = JSON.parse(request.responseText)
        for (var i = 0; i <  res_array.length; i++) {
            if (res_array[i].restaurant_id == sessionStorage.getItem("restaurant_id")) {
                // if restaurant is already in favourites
                document.getElementById("btn_favourite").innerHTML = `<i class="fa fa-heart"></i> Remove from Favourites`
                return
            }
            document.getElementById("btn_favourite").innerHTML = `<i class="fa fa-heart-o"></i> Add to Favourites`
        }
    }
    request.send();
  }