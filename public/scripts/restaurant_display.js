
info_array=[]
comments_count = 0;

function retrieveInfo () {
    var name = sessionStorage.getItem('restaurant_name');
    var address = sessionStorage.getItem('restaurant_address');
    var description = sessionStorage.getItem('description');
    var contact_number = sessionStorage.getItem('restaurant_number')
    var url = sessionStorage.getItem('restaurant_url')
    var operating_hours = sessionStorage.getItem('restaurant_hours')
    var min_price = sessionStorage.getItem('restaurant_min')
    var max_price = sessionStorage.getItem('restaurant_max')
    var cuisine = sessionStorage.getItem('restaurant_cuisine')
    var cuisine_color = sessionStorage.getItem('restaurant_cuisine_color')

    document.getElementById('res_name').innerHTML = name;
    document.getElementById('res_address').innerHTML = address;
    document.getElementById('res_desc').innerHTML = description;
    document.getElementById('res_number').innerHTML = contact_number;
    document.getElementById('res_url').innerHTML = url;
    document.getElementById('res_hours').innerHTML = operating_hours;
    document.getElementById('res_min').innerHTML = min_price;
    document.getElementById('res_max').innerHTML = max_price;
    document.getElementById('res_cuisine').innerHTML = cuisine;
}
function retrieveComments() {
    request = new XMLHttpRequest();

    var id = sessionStorage.getItem('restaurant_id');
    var request_url = '/reviews/'+id;

    request.open('GET', request_url, true);
    request.onload = function() {
        info_array = JSON.parse(request.responseText);
        
        console.log(info_array);

        displayComments();
    }
    request.send();
}

// called when page is loaded
function displayComments() {
    var section = document.getElementById('commentSection');
    section.innerHTML = "";
    comments_count = 3;

    for (var i = 0; i < comments_count; i++) {
        console.log(i)
        console.log(info_array[i])
        var review_id = info_array[i].review_id;
        var review_title = info_array[i].review_title;
        var comment = info_array[i].comment;
        var date_posted = info_array[i].date_posted;
        var overall_rating = info_array[i].overall_rating;
        var food_rating = info_array[i].food_rating;
        var service_rating = info_array[i].service_rating;
        var value_rating = info_array[i].value_rating;
        var username = info_array[i].username;

        // TODO: format the comments 
        //var cell = ; 

        //section.insertAdjacentHTML('beforeend', cell); 

    }
}


    // to be called by show more button
    function displayAllComments() {
        var section = document.getElementById('commentSection');
        section.innerHTML = "";
        comments_count = info_array.length;
    
        for (var i = 0; i < comments_count; i++) {
            console.log(i)
            console.log(info_array[i])
            var review_id = info_array[i].review_id;
            var review_title = info_array[i].review_title;
            var comment = info_array[i].comment;
            var date_posted = info_array[i].date_posted;
            var overall_rating = info_array[i].overall_rating;
            var food_rating = info_array[i].food_rating;
            var service_rating = info_array[i].service_rating;
            var value_rating = info_array[i].value_rating;
            var username = info_array[i].username;
    
            // TODO: format the comments 
            //var cell = ; 
    
            //section.insertAdjacentHTML('beforeend', cell); 

    }

    function sort_by(type) {
        switch (type) {
            case 'highest':
                info_array.sort(function(a, b) {
                    return b.overall_rating - a.overall_rating || b.food_rating - a.food_rating || b.service_rating - a.service_rating || b.value_rating || a.service_rating;
                });

            case 'lowest':
                info_array.sort(function(a, b) {
                    return a.overall_rating - b.overall_rating || a.food_rating - b.food_rating || a.service_rating - b.service_rating || a.value_rating || b.service_rating;
                });

            case 'newest':
                info_array.sort(function(a, b) {
                    return b.review_id - a.review_id;
                });
        }

            
        
        
    }
}
