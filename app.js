//var apiKey = "06f4da569d9b1bca7a02f8f3778065d7";
var coordinates = {
    lat: 0,
    lng: 0
};
/*example api endpoint:
http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=06f4da569d9b1bca7a02f8f3778065d7
apiKey for googleTimeZones API: AIzaSyDz7bLbxSCtbzwsPX7oDjybneze2EkduwA
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
        //var city = "City: " + json.results[0].formatted_address;
        coordinates = {
            lat: json.results[0].geometry.location.lat,
            lng: json.results[0].geometry.location.lng
        };
        //$("#coordinates").text("Coordinates: " + json.results[0].geometry.location.lat + "," + json.results[0].geometry.location.lng);
        //$("#city").text(city);
        //$("#coordinates").text("Coordinates(Lat,Lng): " + coordinates.lat + ", " + coordinates.lng);

        var targetDate = new Date() // Current date/time of user computer
        var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
        var apikey = 'AIzaSyDz7bLbxSCtbzwsPX7oDjybneze2EkduwA'
        var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + coordinates.lat + ',' + coordinates.lng + '&timestamp=' + timestamp + '&key=' + apikey

        var xhr = new XMLHttpRequest() // create new XMLHttpRequest2 object
        xhr.onreadystatechange = myFunction3;
        xhr.open('GET', apicall) // open GET request
        xhr.send() // send request
        console.log(xhr)

        function myFunction3() {
            if (this.readyState == 4 && this.status == 200) {
                var output = JSON.parse(this.responseText)
                var offsets = output.dstOffset * 1000 + output.rawOffset * 1000 // get DST and time zone offsets in milliseconds
                var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
                console.log(localdate.toLocaleString()) // Display current Tokyo date and time
                $("#time").text("Current Local Time: " + localdate.toLocaleString())
            }
        }

    }
}

function apiCall() {
    var search = document.getElementById("search").value;
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = myFunction;
    myRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=06f4da569d9b1bca7a02f8f3778065d7&units=imperial");
    myRequest.send();
    console.log(myRequest);
}

function apiCall2() {
    var search = document.getElementById("search").value;
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = myFunction2;
    myRequest.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyBPLqWp54cqYF0BJg9a02bn5RWEX3I_88Q");
    myRequest.send();
    console.log(myRequest);
}


$(document).on("keydown", function (event) {
    if (event.which == 13) {
        apiCall();
        apiCall2();
    }
});

$("button").click(function () {
    apiCall();
    apiCall2();
})

/*var targetDate = new Date() // Current date/time of user computer
var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
var apikey = 'AIzaSyDz7bLbxSCtbzwsPX7oDjybneze2EkduwA'
var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey

var xhr = new XMLHttpRequest() // create new XMLHttpRequest2 object
xhr.open('GET', apicall) // open GET request
xhr.onload = function(){
    if (xhr.status === 200){ // if Ajax request successful
        var output = JSON.parse(xhr.responseText) // convert returned JSON string to JSON object
        console.log(output.status) // log API return status for debugging purposes
        if (output.status == 'OK'){ // if API reports everything was returned successfully
            var offsets = output.dstOffset * 1000 + output.rawOffset * 1000 // get DST and time zone offsets in milliseconds
            var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
            console.log(localdate.toLocaleString()) // Display current Tokyo date and time
        }
    }
    else{
        alert('Request failed.  Returned status of ' + xhr.status)
    }
}
xhr.send() // send request*/
