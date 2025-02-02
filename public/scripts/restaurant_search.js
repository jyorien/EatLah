const { text } = require("body-parser");

var search_results;
function display() { 
    // get search results
    search_results = JSON.parse(sessionStorage.getItem('search_results'))
    console.log(search_results)

    // change search result text and filter
    var search_cuisine = sessionStorage.getItem("search_cuisine");
    var search_region = sessionStorage.getItem("search_region");
    var search_text = sessionStorage.getItem("search_text");

    // only cuisine
    if (search_cuisine != undefined && search_region == undefined && search_text == undefined) {
        document.getElementById('result_text').innerHTML = `Looking for ${search_cuisine} in Singapore?`;
        document.getElementById('select_cuisine').value= search_cuisine;
    }
    
    // only region
    else if (search_region != undefined && search_cuisine == undefined && search_text == undefined) {
        document.getElementById('result_text').innerHTML = `Looking for food in ${search_region}?`;
        document.getElementById('select_region').value=search_region;
    }

    // cuisine and region
    else if (search_cuisine != undefined && search_region != undefined && search_text == undefined) {
        document.getElementById('result_text').innerHTML = `Looking for ${search_cuisine} in ${search_region}?`;
        document.getElementById('select_cuisine').value=search_cuisine;
        document.getElementById('select_region').value=search_region;
    }

    // text only
    else if (search_cuisine == undefined && search_region == undefined && search_text != undefined) {
        document.getElementById('result_text').innerHTML = `Results for ${search_text}`;
        sessionStorage.removeItem("search_text")
    }
    
    // region and text
    else if (search_cuisine == undefined && search_region != undefined && search_text != undefined) {
        document.getElementById('result_text').innerHTML = `Looking for ${search_text} in ${search_region}?`;
        document.getElementById('select_region').value=search_region;
    }

    else if (search_cuisine == undefined && search_region == undefined && search_text == undefined) {
        document.getElementById('result_text').innerHTML = `Displaying all restaurants`;
    }

    // if no results
    if (search_results.length == 0) {
        console.log("text no result")
        document.getElementById("result_text").innerHTML = "No results"
        sessionStorage.removeItem("search_text")
    }
    displaySearchRestaurants()
    
}

function displaySearchRestaurants() {
    // append restaurant details
    var table = document.getElementById("result_list");
    table.innerHTML = "";
    for (var i = 0; i < search_results.length; i++) {
        var res_id = search_results[i].restaurant_id
        var res_image = search_results[i].featured_url;
        var res_name = search_results[i].restaurant_name;
        var res_address = search_results[i].restaurant_address;
        var res_reviews = search_results[i].total_reviews;
        var res_rating = parseFloat(search_results[i].average).toFixed(1);
        var cuisine_name = search_results[i].cuisine_name;
        var cuisine_color = search_results[i].cuisine_color;
        var res_description = search_results[i].description;
        console.log(res_image, res_name, res_address, res_reviews, res_rating, cuisine_name, cuisine_color, res_description)
        cell = `<div class="result-box" id = "` + res_id + `"onclick="getRestaurantInfo(this)"> 
                 <img class="search-img" src=` +  res_image + `/>

                <div class="search-content"> 
                <h4 style="padding-top: 20px; overflow: hidden; height: 50px; width: 350px;">` +  res_name + `</h4>
                <h6 style="width: 300px; height:20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"> ` +  res_address +`</h6>
                <div style="overflow: hidden; height: 50px; width: 350px; white-space: wrap; display:block;"> ` + res_description + `</div>
                <span> <i class="fa fa-star" style="color:#E7567C;"></i>` + res_rating + ` </span>
                <div style="display: inline; padding-left: 10px;">  <i class="fa fa-comments-o" style="font-size: 25px;"> </i> ` + res_reviews + ` </div>          
                <span class="badge badge-secondary" style="background-color:` +  cuisine_color + `;  margin-left: 10px;"> ` +  cuisine_name+ ` </span>
                <br>
                </div>
            </div> `
        table.insertAdjacentHTML("beforeend", cell)
        
        console.log(i)
    }
}

function getRestaurantInfo(element) {
    var id = element.id;
    var request_url = '/restaurants/'+id;
    console.log(request_url);
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true) 
    request.onload = function () {
        info_array = JSON.parse(request.responseText);
        sessionStorage.setItem('restaurant_id', info_array[0].restaurant_id);
        sessionStorage.setItem('restaurant_name',info_array[0].restaurant_name);
        sessionStorage.setItem('restaurant_address',info_array[0].restaurant_address);
        sessionStorage.setItem('restaurant_description',info_array[0].description);
        sessionStorage.setItem('restaurant_number',info_array[0].phone_number);
        sessionStorage.setItem('restaurant_url',info_array[0].restaurant_url);
        sessionStorage.setItem('restaurant_hours',info_array[0].operating_hours);
        sessionStorage.setItem('restaurant_min',info_array[0].min_price);
        sessionStorage.setItem('restaurant_max',info_array[0].max_price);
        sessionStorage.setItem('restaurant_cuisine',info_array[0].cuisine_name);
        sessionStorage.setItem('restaurant_cuisine_color',info_array[0].cuisine_color);
        sessionStorage.setItem('average_overall', info_array[0].average_overall);
        sessionStorage.setItem('average_food', info_array[0].average_food);
        sessionStorage.setItem('average_service', info_array[0].average_service);
        sessionStorage.setItem('average_value', info_array[0].average_value);
        sessionStorage.setItem('total_reviews', info_array[0].total_reviews);
        sessionStorage.setItem('image_url', info_array[0].image_url)
        console.log(sessionStorage.getItem('restaurant_name'));
        window.location.href = 'restaurant_display.html';
    }
    request.send();

}

// when user clicks on 'Quick Search'
function getQuickSearchResults() {
    var result_object = new Object();
    var selected_cuisine = document.getElementById('select_cuisine').value;
    var selected_region = document.getElementById('select_region').value;

    if (selected_cuisine != 'none') {
        result_object.cuisine = selected_cuisine;
        sessionStorage.setItem('search_cuisine', selected_cuisine)
    }
    else {
        sessionStorage.removeItem('search_cuisine')
    }
    if (selected_region != 'none') {
        result_object.region = selected_region;
        sessionStorage.setItem('search_region', selected_region);
    }
    else {
        sessionStorage.removeItem('search_region')
    }

    var request = new XMLHttpRequest();
    var request_url = '/search-restaurants'
    
    request.open('POST', request_url)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
        sessionStorage.setItem('search_results', request.responseText);
        location.reload();
            
    }
    request.send(JSON.stringify(result_object));


}

// when user enters a search query
function getTextSearchRestaurants() {
    
    var search_box = document.getElementById("search_page_input")

    search_box.addEventListener("keyup", function(event) {

        // when user clicks enter after typing input
        if (event.key === "Enter") {
            var search_object = new Object();
            search_object.text_search = search_box.value;
            sessionStorage.removeItem("search_region");
            sessionStorage.removeItem("search_cuisine");

            var request_url = '/search-restaurants'
            var request = new XMLHttpRequest();
    
            request.open('POST', request_url, true);
            request.setRequestHeader("Content-type", "application/json");
            request.onload = function() {
                sessionStorage.setItem('search_results', request.responseText);
                sessionStorage.setItem('search_text', search_box.value);
                 location.reload();
            }
            request.send(JSON.stringify(search_object))


        }
    })
}

function load_sorted() {
    var type = document.querySelector('input[name="search_sort"]:checked').value
    console.log(type)
    sort_restaurants(type);
    displaySearchRestaurants();
    console.log(search_results);
}

function sort_restaurants(type) {
    if (type == 'highest') {
        search_results.sort(function(a,b) {
            return b.average - a.average;
        } )
    }

    else if (type == 'reviews') {
        search_results.sort(function(a,b) {
            return b.total_reviews - a.total_reviews;
        })
    }

}