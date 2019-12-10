


let apiKey = "524901&APPID=828d8c5dd2b3ef0673d597d675ed89f6"
var title = "";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(queryURL)
});



// * Current conditions

// * 5-Day Forecast

// * Search history

// * UV index

