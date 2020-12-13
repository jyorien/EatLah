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
        console.log(response);
        document.getElementById("loginForm").reset();
        if (response[1] == credentials.username) {
            location.reload();
            localStorage.setItem('user_name', credentials.username);
            localStorage.setItem('user_id', response[0]);
        }
        else {
            document.getElementById("message").textContent = response.message;
        }
        
    }
    request.send(JSON.stringify(credentials));
    
}

function welcome() {
    var urlParams = new URLSearchParams(window.location.search);
    var navElement;
    if ("user_name" in localStorage) {

        navElement = '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="profileDrop" data-toggle="dropdown"> </a> <div class="dropdown-menu"><a class="dropdown-item" href="#">Link 1</a><a class="dropdown-item" href="#">Link 2</a> <a class="dropdown-item" onclick="localStorage.clear(); location.reload();" href="#">Logout</a> </div>'
        document.getElementById('topRightNavbar').insertAdjacentHTML("afterbegin",navElement); 
        //var username = urlParams.getAll('username')
        document.getElementById('profileDrop').textContent = localStorage.getItem('user_name');
    }
    else {
        navElement = '<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#login_modal" href="#">Login </a> </li>'
        navElement += '<li class="nav-item"> <a class="nav-link" href="#">Sign Up </a></li>'
        document.getElementById('topRightNavbar').insertAdjacentHTML("afterbegin",navElement); 
        
    }
    
    
        
    
}