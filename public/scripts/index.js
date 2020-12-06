function getFeaturedRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', '/featured-restaurants')
    request.onload = function () {
        restaurant_array = JSON.parse(request.responseText);
        displayRestaurants();

    }
    request.send();
    
}