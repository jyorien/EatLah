function getCuisineFilterResults(filter) {
    var request = new XMLHttpRequest();
    var request_url = `/search-restaurants/search/region/${filter}`
    request.open('GET', request_url)
    request.onload = function () {
        console.log('test')
        console.log(JSON.parse(request.responseText));
        
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
        console.log('test')
        console.log(JSON.parse(request.responseText));
        
    }
    request.send();
}