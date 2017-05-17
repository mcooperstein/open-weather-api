var apiKey = "06f4da569d9b1bca7a02f8f3778065d7";
/*example api endpoint:
http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=06f4da569d9b1bca7a02f8f3778065d7
*/
function myFunction() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        $("#city").text("Name of City: " + json.name);
        $("#weather").text("Weather: " + json.weather[0].description);
        $("#icon").html("<img src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png'>");
        $("#temp").text("Current Temperature: " + json.main.temp + " degrees Fahrenheit");
    }
}

function myFunction2() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        var city = "City: " + json.results[0].formatted_address;
        var coordinates = "Coordinates(Lat,Lng): " + json.results[0].geometry.location.lat + "," + json.results[0].geometry.location.lng;
        //$("#coordinates").text("Coordinates: " + json.results[0].geometry.location.lat + "," + json.results[0].geometry.location.lng);
        $("#city").text(city);
        $("#coordinates").text(coordinates);
        /*$("#weather").text("Weather: " + json.weather[0].description);
        $("#icon").html("<img src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png'>");
        $("#temp").text("Current Temperature: " + json.main.temp + " degrees Fahrenheit");*/
    }
}

function findTime() {

}

function apiCall() {
    var search = document.getElementById("search").value;
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = myFunction2;
    //url or file location of what page we're trying to access
    //myRequest.open("GET", "https://api.soundcloud.com/tracks?client_id=1dff55bf515582dc759594dac5ba46e9&amp;q=beyonce");
    myRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=06f4da569d9b1bca7a02f8f3778065d7&units=imperial");
    myRequest.send();
    console.log(myRequest);
}

function apiCall2() {
    var search = document.getElementById("search").value;
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = myFunction2;
    //url or file location of what page we're trying to access
    //myRequest.open("GET", "https://api.soundcloud.com/tracks?client_id=1dff55bf515582dc759594dac5ba46e9&amp;q=beyonce");
    myRequest.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyBPLqWp54cqYF0BJg9a02bn5RWEX3I_88Q");
    myRequest.send();
    console.log(myRequest);
}

function geocodeAddress() {
    var address = document.getElementById('search').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            console.log(results)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

$(document).on("keydown", function (event) {
    if (event.which == 13) {
        apiCall2();
    }
})
