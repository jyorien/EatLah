var user_fn = document.getElementById("user_fn");
var user_ln = document.getElementById("user_ln");
var user_un = document.getElementById("user_un");
var user_gender = document.getElementById("user_gender");
var user_address = document.getElementById("user_address");
var user_email = document.getElementById("user_email");
var user_number = document.getElementById("user_number");
var user_password;


function getUserDetails() {
    var url = `/user/${localStorage.getItem("user_id")}`;
    console.log(url)
    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function() {

        // get profile details
        var image = document.getElementById("profile_image");
        var user_info = JSON.parse(request.responseText);
        user_fn.value = user_info[0].first_name;
        user_ln.value = user_info[0].last_name;
        user_un.value = user_info[0].username;
        user_gender.value = user_info[0].gender;
        user_email.value = user_info[0].email;
        user_password = user_info[0].password;
    
        if (user_info[0].address != 'null') {
            user_address.value = user_info[0].address;
        }
        if (user_info[0].mobile_number != 'null') {
            user_number.value = user_info[0].mobile_number
        }
       


        var image_base64 = user_info[0].user_image;
        if (image_base64 != null && image_base64 !=  undefined && image_base64 != "")
            image.src = image_base64;
    }
    request.send();
}

// Handle tab select
function openPage(page, element) {
    var tabcontents = document.getElementsByClassName("tab-content");
    var tablinks = document.getElementsByClassName("tab-link");
    let tab = document.getElementById(page);
    console.log(tabcontents + tablinks + tab)


    // Hide tabs and button colors
    for (var i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tablinks[i].style.backgroundColor = "";
    }

    // Show tab content
    
    document.getElementById(page).style.display = "block";

    // Color the button
    element.style.backgroundColor = '#F9D2C3';
}


// Save user profile picture
var file_input = document.getElementById("file_input");
// read the uploaded file
file_input.addEventListener('change', function(event) {
    var file;
    var image = document.getElementById("profile_image");
    var file_base64;

    file = event.target.files[0];
    if (file.size > 70000) {
        alert("Your file size must be less than 70kB!")
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', function(event) {
        image.src = event.target.result;
        file_base64 = event.target.result;
        
        updateUserImage(file_base64);
    });
    reader.readAsDataURL(file)
    
})

function updateUserImage(image) {
    var image_object = new Object();
    image_object.file = image;
    var request = new XMLHttpRequest();
    var url = `/user/${localStorage.getItem("user_id")}`;
    console.log(url);
    request.open("PUT", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
        location.reload();
    }
    request.send(JSON.stringify(image_object));

}

function updateUserDetails() {
    var response = confirm("Are you sure you want to save changes?");
    if (response === false) {
        return
    } 
    var user_object = new Object();
    user_object.first_name = user_fn.value.trim();
    user_object.last_name = user_ln.value.trim();
    user_object.gender = user_gender.value;
    user_object.address = user_address.value.trim();
    user_object.email = user_email.value.trim();
    user_object.mobile_number = user_number.value.replace(/\s/g,'');

    // check if is valid email using regex
    const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex_email.test(user_object.email) === false) {
        alert("Your email is invalid!");
        return
    }

    // check if mobile number is numeric
    const regex_num = /^\d+$/;
    if (regex_num.test(user_object.mobile_number) === false) {
        alert("Your mobile number should only have digits!")
        return
    }

    var request = new XMLHttpRequest();
    var url = `/user/${localStorage.getItem("user_id")}`;
    request.open("PUT", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
        location.reload();
    }
    request.send(JSON.stringify(user_object))
}

function updatePassword() {
    var user_password_current = document.getElementById("user_password_current").value;
    var user_password_new = document.getElementById("user_password_new").value;
    var user_password_confirm = document.getElementById("user_password_confirm").value;

    // check for empty fields
    if (user_password_current !== "" && user_password_current !== 'null' && user_password_new !== "" && user_password_new !== 'null' && user_password_confirm !== "" && user_password_confirm !== "" ) {
        // check if current password entered is correct
        if (user_password_current === user_password) {
            // check if password is > 8 characters long
            if (user_password_new.length > 8) {
                // check if new password matches
                if (user_password_new === user_password_confirm) {
                    // check for user confirmation
                    var response = confirm("Are you sure you want to change passwords?");
                    if (response === false) {
                        return
                    } 
        
                    var user_object = new Object();
                    user_object.password = user_password_new;
                    var request = new XMLHttpRequest();
                    var url = `/user/${localStorage.getItem("user_id")}`;
                    request.open("PUT", url, true);
                    request.setRequestHeader("Content-type", "application/json");
                    request.onload = function() {
                        location.reload();
                    }
                    request.send(JSON.stringify(user_object))
                }
                else {
                    alert("Passwords do not match.")
                    return;
                }
            }
            else {
                alert("Your password must be at least 8 characters long!");
                return;
            }

        }
        else {
            alert("Please enter the correct password.")
            return;
        }
    }
    else {
        alert("Please fill in the fields")
    }

}

function deleteAccount() {
    var user_password_delete = document.getElementById("user_password_delete").value;
    if (user_password === user_password_delete) {
        var response = confirm("Are you sure you want to delete this account? This is irreversible.");
        if (response === false) {
            return
        } 
        var request = new XMLHttpRequest();
        var url = `/user/${localStorage.getItem("user_id")}`;
        request.open("DELETE", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function() {
            alert("Your account has been deleted");
            localStorage.clear();
            window.location.href = 'index.html';
        }
        request.send();
        
        

    }

}