function getUserDetails() {
    var request = new XMLHttpRequest();
    var url = `/user/${localStorage.getItem("user_id")}`;
    request.open('GET', url, true);
    request.onload = function() {
        var image = document.getElementById("profile_image");
        var user_info = JSON.parse(request.responseText);
        var image_base64 = user_info[0].user_image;

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
        //location.reload();
    }
    request.send(JSON.stringify(image_object));

}