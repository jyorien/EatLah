function retrieveInfo () {
    var name = sessionStorage.getItem('restaurant_name');
    document.getElementById('res_name').innerHTML = name;
}