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