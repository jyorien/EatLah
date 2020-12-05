function login() {
    var message="";
    var credentials = new Object();
    credentials.username = document.getElementById('username').value;
    credentials.password = document.getElementById('password').value;
    var request = new XMLHttpRequest();

    request.open("POST", "/login", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
        response = JSON.parse(request.responseText);
        document.getElementById("loginForm").reset();
        if (response.message == "1") {
            window.location = "index.html?username=" + credentials.username;
        }
        else {
            document.getElementById("message").textContent = response.message;
        }
        
    }
    request.send(JSON.stringify(credentials));
}

function welcome() {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.getAll('username')
    alert(username);
}