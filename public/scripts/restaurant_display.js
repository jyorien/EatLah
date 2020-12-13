comments_array=[]
comments_count = 0;
var percentage_recommend = 0;

function retrieveInfo () {
    var name = sessionStorage.getItem('restaurant_name');
    var address = sessionStorage.getItem('restaurant_address');
    var description = sessionStorage.getItem('restaurant_description');
    
    console.log(description)
    var contact_number = sessionStorage.getItem('restaurant_number');
    var url = sessionStorage.getItem('restaurant_url');
    var operating_hours = sessionStorage.getItem('restaurant_hours');
    var min_price = sessionStorage.getItem('restaurant_min');
    var max_price = sessionStorage.getItem('restaurant_max');
    var cuisine = sessionStorage.getItem('restaurant_cuisine');
    var cuisine_color = sessionStorage.getItem('restaurant_cuisine_color');
    var average_overall = sessionStorage.getItem('average_overall');
    var average_food = parseFloat(sessionStorage.getItem('average_food')).toFixed(1);
    var average_service = parseFloat(sessionStorage.getItem('average_service')).toFixed(1);
    var average_value = parseFloat(sessionStorage.getItem('average_value')).toFixed(1);
    var total_reviews = sessionStorage.getItem('total_reviews');

    document.getElementById('res_name').innerHTML = name;
    document.getElementById('res_cuisine').innerHTML = cuisine;
    document.getElementById('res_badge').style.backgroundColor = cuisine_color;
    document.getElementById('average_overall').innerHTML = average_overall;
    document.getElementById('average_overall_rating').innerHTML = average_overall;
    document.getElementById('total_reviews').innerHTML = total_reviews;
    document.getElementById('description').innerHTML = description;
    document.getElementById('average_food_rating').innerHTML = average_food;
    document.getElementById('average_service_rating').innerHTML = average_service;
    document.getElementById('average_value_rating').innerHTML = average_value;
    document.getElementById('res_address').innerHTML = address;
    document.getElementById('res_number').innerHTML = contact_number;
    document.getElementById('res_url').innerHTML = url;
    document.getElementById('res_url').setAttribute("href", url)
    document.getElementById('res_url').setAttribute("target", "_blank")
    document.getElementById('res_hours').innerHTML = operating_hours;

    
    document.getElementById('res_min').innerHTML = min_price;
    document.getElementById('res_max').innerHTML = max_price;
    
    
}


function retrieveComments() {
    request = new XMLHttpRequest();

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

        displayComments();
    }
    request.send();
}

// called when page is loaded
function displayComments() {
    //var section = document.getElementById('commentSection');
    section.innerHTML = "";
    comments_count = 3;

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

        // TODO: format the comments 
        //var cell = ; 

        //section.insertAdjacentHTML('beforeend', cell); 

    }
}


// to be called by show more button
function displayAllComments() {
    //var section = document.getElementById('commentSection');
    //section.innerHTML = "";
    comments_count = comments_array.length;
    
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
    
        // TODO: format the comments 
        //var cell = ; 
    
        //section.insertAdjacentHTML('beforeend', cell); 

    }
}

function sort_reviews(type) {
    console.log("wtf: " +type)
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

