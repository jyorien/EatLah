//const { response } = require("express");
//const { request } = require("http");

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
            localStorage.setItem('user_id', response[0]);
            localStorage.setItem('user_name', response[1]);
            localStorage.setItem('user_image', response[2])
            
        }
        else {
            document.getElementById("message").textContent = response.message;
        }
        
    }
    request.send(JSON.stringify(credentials));
    
}

function signUp() {
    var request = new XMLHttpRequest();
    // .trim() to remove white spaces 
    var new_first_name = document.getElementById("first_name").value.trim();
    var new_last_name = document.getElementById("last_name").value.trim();
    var new_username = document.getElementById("new_username").value.toLowerCase().trim();
    var new_gender = document.getElementById("gender").value;
    var new_address = document.getElementById("new_address").value.trim();
    var new_email = document.getElementById("new_email").value.trim();
    var new_mobile = document.getElementById("mobile_number").value.replace(/\s/g,'');
    var new_password = document.getElementById("new_password").value;
    var new_password_confirm = document.getElementById("confirm_password").value;

    if (new_password.length < 8) {
        alert("Your password must be at least 8 characters long!");
        return;
    }

    // check if passwords match
    if (new_password != new_password_confirm) {
        alert("Passwords do not match!");
        return;
    }

    // check if username has > 16 characters
    if (new_username.length > 16) {
        alert("Username must have 16 or less characters!")
        return;
    }

    // check if is valid email using regex
    const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex_email.test(new_email) === false) {
        alert("Your email is invalid!");
        return
    }

    // check if mobile number is numeric
    if (new_mobile != "" && new_mobile != null) {
        const regex_num = /^\d+$/;
        if (regex_num.test(new_mobile) === false) {
            alert("Your mobile number should only have digits!")
            return
        }
    }

    
    // Check if username exists in database
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
            // if username exists, exit function
            alert(response.message);
            return
        }
    }
    request.send()

    function addNewAccount() {
        var request = new XMLHttpRequest();
            
    
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

}

function enableSignUp() {
    var sign_up_button = document.getElementById("btnSignUp");
    var new_first_name = document.getElementById("first_name").value;
    var new_last_name = document.getElementById("last_name").value;
    var new_username = document.getElementById("new_username").value.toLowerCase();
    var new_email = document.getElementById("new_email").value;
    var new_password = document.getElementById("new_password").value;
    var new_password_confirm = document.getElementById("confirm_password").value;
    var new_gender = document.getElementById("gender").value;

    if (new_first_name != "" && new_last_name != "" && new_username != "" && new_email != "" && new_password != "" && new_password_confirm != "" && new_gender != "") {
        console.log("enable")
        sign_up_button.disabled= false;
    }

    else {
        sign_up_button.disabled = true;
    }
}




function welcome() {

    var navElement;
    if ("user_name" in localStorage) {

        navElement = `<li class="nav-item dropdown"> 
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" class="nav-link dropdown-toggle" href="#" id="profileDrop" data-toggle="dropdown" style="width:65px; border-radius:50%;"> 
         
        <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="#" onclick="goToProfileFavourites()"> Profile </a><a class="dropdown-item" href="#" onclick="goToProfileFavourites()"> Favourites </a> 
        <a class="dropdown-item" onclick="logOut()" href="#">Logout</a>
         </div>`
        document.getElementById('topRightNavbar').insertAdjacentHTML("afterbegin",navElement); 

        if ( localStorage.getItem('user_image') !== 'null' ) {
            document.getElementById('profileDrop').src = localStorage.getItem('user_image');
        }
            
    }
    else {
        navElement = '<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#login_modal" href="#">Login </a> </li>'
        navElement += '<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#sign_up_modal" href="#">Sign Up </a></li>'
        document.getElementById('topRightNavbar').insertAdjacentHTML("afterbegin",navElement); 
        
    }
    
}

function goToProfileFavourites() {
    window.location.href="profile.html"
}

function logOut() {
    localStorage.clear(); 
    window.location.href = 'index.html';
}