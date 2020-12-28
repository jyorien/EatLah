var user_fn = document.getElementById("user_fn");
var user_ln = document.getElementById("user_ln");
var user_un = document.getElementById("user_un");
var user_gender = document.getElementById("user_gender");
var user_address = document.getElementById("user_address");
var user_email = document.getElementById("user_email");
var user_number = document.getElementById("user_number");
var user_password;
var image_base64;


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
       


        image_base64 = user_info[0].user_image;
        if (image_base64 != null && image_base64 !=  undefined && image_base64 != "")
            image.src = image_base64;
    }
    request.send();
}

// Handle tab select
function openPage(page, element) {
    sessionStorage.setItem("tab", page)
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

function getTab() {
    var tabcontents = document.getElementsByClassName("tab-content");
    var tablinks = document.getElementsByClassName("tab-link");

    // Hide tabs and button colors
    for (var i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tablinks[i].style.backgroundColor = "";
    }

    if (sessionStorage.getItem("tab") == 'tab_profile') {
        document.getElementById('tab_profile').style.display = "block";
        document.getElementById("btn_profile").style.backgroundColor = '#F9D2C3';
    }
    else {
        document.getElementById('tab_favourites').style.display = "block";
        document.getElementById("btn_favourites").style.backgroundColor = '#F9D2C3';
    }
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
        localStorage.setItem("user_image",image)
        location.reload();
    }
    request.send(JSON.stringify(image_object));

}

function updateUserDetails() {
    var user_object = new Object();
    user_object.first_name = user_fn.value.trim();
    user_object.last_name = user_ln.value.trim();
    user_object.gender = user_gender.value;
    user_object.address = user_address.value.trim();
    user_object.email = user_email.value.trim();
    user_object.mobile_number = user_number.value.replace(/\s/g,'');

    // check if name is valid
    const regex_name = /^[a-z ,.'-]+$/i;
    if (regex_name.test(user_object.first_name) === false || regex_name.test(user_object.last_name) === false) {
        alert("Your first and last names should only contain alphabets!");
        return
    }

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

    var confirm_password = document.getElementById("password_confirm").value;
    if (confirm_password == "") {
        alert("Please enter your password!")
        return
    }
    else if (confirm_password !== user_password) {
        alert("Wrong password. Changes not saved.")
        return
    }

    var response = confirm("Are you sure you want to save changes?");
    if (response === false) {
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
        if (response === true) {
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
}

function getUserFavourites() {
    var request = new XMLHttpRequest();
    var url = `/favourite/${localStorage.getItem("user_id")}`
    request.open('GET', url, true);
    request.onload = function() {
        var res_array = JSON.parse(request.responseText);
        displayRestaurants(res_array)
    }
    request.send();
}

function displayRestaurants(restaurant_array) {
    var table = document.getElementById("favTable");
    table.innerHTML = "";
    restaurant_count = restaurant_array.length;
    for (var i = 0; i < restaurant_count; i++) {
        var restaurant_id = restaurant_array[i].restaurant_id;
        var restaurant_name = restaurant_array[i].restaurant_name;
        var cuisine_name = restaurant_array[i].cuisine_name;
        var cuisine_color = restaurant_array[i].cuisine_color;
        var restaurant_image = restaurant_array[i].featured_url;
        var cell = '<div class="col-md-3">' + 
                    '<div class="card" style="margin:20px 0 20px 0;" >' +
                    '<a class="card-block stretched-link"' + 'id='+restaurant_id +' + href="#" onclick='+'getRestaurantInfo(this)'+'></a>' +
                    '<img class="card-img-top" src=' + restaurant_image + ' alt="Card image cap">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title" style="overflow:hidden; text-overflow: ellipsis; word-wrap: brea-word; display:block; line-height: 1em; max-height: 1em;">' + restaurant_name +'</h5>' +
                    '<span class="badge badge-secondary float-right" style="background-color:' + cuisine_color +';">' + cuisine_name +'</span>'+
                    '</div> </div> </div>';
        table.insertAdjacentHTML('beforeend', cell); 
    }
}

function getRestaurantInfo(element) {
    var id = element.id;
    var request_url = '/restaurants/'+id;
    console.log(request_url);
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true); 

    request.onload = function () {
        info_array = JSON.parse(request.responseText);
        sessionStorage.setItem('restaurant_id', info_array[0].restaurant_id);
        sessionStorage.setItem('restaurant_name',info_array[0].restaurant_name);
        sessionStorage.setItem('restaurant_address',info_array[0].restaurant_address);
        sessionStorage.setItem('restaurant_description',info_array[0].description);
        sessionStorage.setItem('restaurant_number',info_array[0].phone_number);
        sessionStorage.setItem('restaurant_url',info_array[0].restaurant_url);
        sessionStorage.setItem('restaurant_hours',info_array[0].operating_hours);
        sessionStorage.setItem('restaurant_min',info_array[0].min_price);
        sessionStorage.setItem('restaurant_max',info_array[0].max_price);
        sessionStorage.setItem('restaurant_cuisine',info_array[0].cuisine_name);
        sessionStorage.setItem('restaurant_cuisine_color',info_array[0].cuisine_color);
        sessionStorage.setItem('average_overall', info_array[0].average_overall);
        sessionStorage.setItem('average_food', info_array[0].average_food);
        sessionStorage.setItem('average_service', info_array[0].average_service);
        sessionStorage.setItem('average_value', info_array[0].average_value);
        sessionStorage.setItem('total_reviews', info_array[0].total_reviews);
        sessionStorage.setItem('image_url', info_array[0].image_url)
        console.log(sessionStorage.getItem('restaurant_name'));
        window.location.href = 'restaurant_display.html';
    }
    request.send();

}

function enableSave() {
    var btn_details = document.getElementById("btn_details");
    if (user_fn.value != "" && user_ln.value != "" && user_un.value != "" && user_email.value != "" && user_gender.value != "") {
        console.log("enable")
        btn_details.disabled = false;
    }
    else {
        btn_details.disabled = true;
    }        
}

function enableDelete() {
    var btn_delete = document.getElementById("btn_delete");
    if (document.getElementById("user_password_delete").value != "") {
        btn_delete.disabled = false;
    }
    else {
        btn_delete.disabled = true;
    }
}