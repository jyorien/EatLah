function getFeaturedRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', '/featured-restaurants')
    request.onload = function () {
        restaurant_array = JSON.parse(request.responseText);
        //console.log(request.responseText);
        displayRestaurants();

    }
    request.send();
}
function displayRestaurants() {
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";
    restaurant_count = restaurant_array.length;
    for (var i = 0; i < restaurant_count; i++) {
        var restaurant_id = restaurant_array[i].restaurant_id;
        var restaurant_name = restaurant_array[i].restaurant_name;
        var cuisine_name = restaurant_array[i].cuisine_name;
        var cuisine_color = restaurant_array[i].cuisine_color;
        var average_rating = restaurant_array[i].average.toFixed(1);
        var restaurant_image = restaurant_array[i].featured_url;
        var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' + 
                    '<div class="card" style="margin:20px 0 20px 0;" >' +
                    '<a class="card-block stretched-link"' + 'id='+restaurant_id +' + href="#" onclick='+'getRestaurantInfo(this)'+'></a>' +
                    '<img class="card-img-top" src=' + restaurant_image + ' alt="Card image cap">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title" style="overflow:hidden; text-overflow: ellipsis; word-wrap: brea-word; display:block; line-height: 1em; max-height: 1em;">' + restaurant_name +'</h5>' +
                    '<span>' + average_rating + ' <i class="fa fa-star" style="color:#E7567C;"></i></span>' +
                    '<span class="badge badge-secondary float-right" style="background-color:' + cuisine_color +';">' + cuisine_name +'</span>'+
                    '</div> </div> </div>';
        table.insertAdjacentHTML('beforeend', cell); 
    }

}

function getRestaurantInfo(element) {
    var id = element.id;
    var request_url = '/restaurants/'+id;
    console.log(request_url);
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true); 
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
    function getSearchResults() {
        var search_object = new Object();
        search_object.text_search = document.getElementById('text_search').value; // string
        var select_search = document.getElementById('select_search').value; // region
        // if region select is not empty
        if (select_search != 'region') {
            search_object.region = select_search;
        }
        else {
            sessionStorage.removeItem("search_region");
            sessionStorage.removeItem("search_cuisine");
        }
        
        var request_url = '/search-restaurants';
        var request = new XMLHttpRequest();

        request.open('POST', request_url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function() {
            sessionStorage.setItem('search_results', request.responseText);
            sessionStorage.setItem('search_text', search_object.text_search);
             window.location.href = 'search_results.html';
        }
        request.send(JSON.stringify(search_object));
        
    }

    function getSearchResultsOnEnter() {
        var text_search = document.getElementById("text_search");
    

        text_search.addEventListener("keyup", function(event) {

            if (event.key === "Enter") {
                getSearchResults();
            }   
        })
    }
