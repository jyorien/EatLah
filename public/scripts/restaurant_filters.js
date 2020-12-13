function getCuisineFilterResults(filter) {
    var cusine_object = new Object();
    cusine_object.cuisine = filter;
    var request = new XMLHttpRequest();
    var request_url = '/search-restaurants'

    request.open('POST', request_url)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
        sessionStorage.setItem('search_results', request.responseText);
        window.location.href = 'search_results.html'
        
    }
    request.send(JSON.stringify(cusine_object));

}

function getRegionFilterResults(filter) {
    var region_object = new Object();
    region_object.region = filter;
    var request = new XMLHttpRequest();
    var request_url = '/search-restaurants'

    request.open('POST', request_url)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
        sessionStorage.setItem('search_results', request.responseText);
        window.location.href = 'search_results.html';
        
    }
    request.send(JSON.stringify(region_object));
}