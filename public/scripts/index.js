function getFeaturedRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', '/featured-restaurants')
    request.onload = function () {
        restaurant_array = JSON.parse(request.responseText);
        console.log(request.responseText);
        displayRestaurants();

    }
    request.send();
}
function displayRestaurants() {
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";
    restaurant_count = restaurant_array.length;
    for (var i = 0; i < restaurant_count; i++) {
        var restaurant_name = restaurant_array[i].restaurant_name;
        var cuisine_name = restaurant_array[i].cuisine_name;
        var cuisine_color = restaurant_array[i].cuisine_color;
        var average_rating = restaurant_array[i].average.toFixed(1);
        var restaurant_image = restaurant_array[i].featured_url;
        var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' + 
                    '<div class="card" style="margin:20px 0 20px 0;" >' +
                    '<a class="card-block stretched-link" href="#"></a>' +
                    '<img class="card-img-top" src=' + restaurant_image + ' alt="Card image cap">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title" style="overflow:hidden; text-overflow: ellipsis; word-wrap: brea-word; display:block; line-height: 1em; max-height: 1em;">' + restaurant_name +'</h5>' +
                    '<span>' + average_rating + ' <i class="fa fa-star" style="color:#E7567C;"></i></span>' +
                    '<span class="badge badge-secondary float-right" style="background-color:' + cuisine_color +';">' + cuisine_name +'</span>'+
                    '</div> </div> </div>'
        table.insertAdjacentHTML('beforeend', cell); 
    }

}