function getCuisineFilterResults(filter) {
    var request = new XMLHttpRequest();
    var request_url = `/search-restaurants/search/region/${filter}`
    console.log(request_url)
    request.open('GET', request_url)
    request.onload = function () {
        sessionStorage.setItem('search_results', request.responseText);
        window.location.href = 'search_results.html'
        
    }
    request.send();

}

function getRegionFilterResults(filter) {
    console.log(filter)
    var request = new XMLHttpRequest();
    var request_url = `/search-restaurants/search/${filter}/cuisine`
    console.log(request_url)
    request.open('GET', request_url)
    request.onload = function () {
        sessionStorage.setItem('search_results', request.responseText);
        window.location.href = 'search_results.html'
        
    }
    request.send();
}