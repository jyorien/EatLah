function getCuisineFilterResults(filter) {
    var cuisine_object = new Object();
    cuisine_object.cuisine = filter;
    var request = new XMLHttpRequest();
    var request_url = '/search-restaurants'

    request.open('POST', request_url)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
        sessionStorage.setItem('search_results', request.responseText);
        sessionStorage.setItem('search_cuisine', filter);
        sessionStorage.removeItem('search_region');
        window.location.href = 'search_results.html';
        
    }
    request.send(JSON.stringify(cuisine_object));

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
        sessionStorage.setItem('search_region', filter);
        sessionStorage.removeItem('search_cuisine');
        window.location.href = 'search_results.html';
        
    }
    request.send(JSON.stringify(region_object));
}