var apiKey = "06f4da569d9b1bca7a02f8f3778065d7";
/*example api endpoint:
http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=06f4da569d9b1bca7a02f8f3778065d7
*/
function myFunction() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        $("#city").text("Name of City: " + json.name);
        $("#weather").text("Weather: " + json.weather[0].description);
        $("#temp").text("Current Temperature: " + json.main.temp + " degrees Fahrenheit");
    }
}

function apiCall() {
    var search = document.getElementById("search").value;
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = myFunction;
    //url or file location of what page we're trying to access
    //myRequest.open("GET", "https://api.soundcloud.com/tracks?client_id=1dff55bf515582dc759594dac5ba46e9&amp;q=beyonce");
    myRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=06f4da569d9b1bca7a02f8f3778065d7&units=imperial");
    myRequest.send();
    console.log(myRequest);
}
