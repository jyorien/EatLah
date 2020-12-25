const { response } = require("express");
const { request } = require("http");

function login() {
    var message="";
    var credentials = new Object();
    credentials.username = document.getElementById('username').value.toLowerCase();
    credentials.password = document.getElementById('password').value;
    var request = new XMLHttpRequest();

    request.open("POST", "/login", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
        var response = JSON.parse(request.responseText);
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

function signUp() {
    var request = new XMLHttpRequest();
    // FN,LN - 45, username - 16, pass - min 8, email - 128
    var new_username = document.getElementById("new_username").value;


    // Check whether username exists in database
    var url = `/sign-up/${new_username}`

    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
        
        var response = JSON.parse(request.responseText)
        if (response.message == 1) {
            // if username doesn't exist, add new user
            addNewAccount();

        }
        else {
            alert(response.message);
            return
        }
    }
    request.send()

}

function addNewAccount() {
    var request = new XMLHttpRequest();
    var new_first_name = document.getElementById("first_name").value;
    var new_last_name = document.getElementById("last_name").value;
    var new_username = document.getElementById("new_username").value.toLowerCase();
    var new_gender = document.getElementById("gender").value;
    var new_address = document.getElementById("new_address").value;
    var new_email = document.getElementById("new_email").value;
    var new_mobile = document.getElementById("mobile_number").value;
    var new_password = document.getElementById("new_password").value;
    var new_password_confirm = document.getElementById("confirm_password").value;
    console.log(`first name: ${new_first_name}
    last name: ${new_last_name}
    username: ${new_username}
    gender: ${new_gender}
    address: ${new_address}
    email: ${new_email}
    mobile: ${new_mobile}
    pass: ${new_password}
    new pass: ${new_password_confirm}`)

    var user = new Object();
    user.first_name = new_first_name;
    user.last_name = new_last_name;
    user.username = new_username;
    user.gender = new_gender;
    user.address = new_address;
    user.email = new_email;
    user.mobile_number = new_mobile;
    user.password = new_password;

    request.open("POST","/sign-up",true)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
        alert("Sign up success! You can now log into your new account.")
        location.reload();

    }
    request.send(JSON.stringify(user))
}

function welcome() {

    var navElement;
    if ("user_name" in localStorage) {

        navElement = '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="profileDrop" data-toggle="dropdown"> </a> <div class="dropdown-menu"><a class="dropdown-item" href="#">Link 1</a><a class="dropdown-item" href="#">Link 2</a> <a class="dropdown-item" onclick="localStorage.clear(); location.reload();" href="#">Logout</a> </div>'
        document.getElementById('topRightNavbar').insertAdjacentHTML("afterbegin",navElement); 

        document.getElementById('profileDrop').textContent = localStorage.getItem('user_name');
    }
    else {
        navElement = '<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#login_modal" href="#">Login </a> </li>'
        navElement += '<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#sign_up_modal" href="#">Sign Up </a></li>'
        document.getElementById('topRightNavbar').insertAdjacentHTML("afterbegin",navElement); 
        
    }
    
    
        
    
}