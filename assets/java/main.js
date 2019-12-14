let d = new Date();
console.log(d)
$("#date").text(d)

let cityArr = []

if(localStorage.getItem("cities")) {
    cityArr = JSON.parse(localStorage.getItem("cities"))
}

$("#city_find").on("click", function () {

    let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"
    let city = $("#city_search").val();
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;
    if(cityArr.indexOf(city) == -1) {
        cityArr.push(city)
        let cityString = JSON.stringify(cityArr)
        localStorage.setItem("cities", cityString)
    }

    // localStorage.setItem("city", city)
    // localStorage.getItem(city)
    // console.log(localStorage.getItem(city))

// need icons to display
// need to format date, to display properly
// uv index
// local storage to save the cities previously searched


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL)
        
        let ultraVURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&cnt=" + response.city.country
        $.ajax({
            url: ultraVURL,
            method: "GET"
        }).then(function (res) {
            console.log(ultraVURL)
            console.log(res)
        })

        //city name 
        $(".city").html("<h2>" + response.city.name + " " + moment(response.list[0].dt_txt).format("MM DD YYYY") + " <i>" + response.list[0].weather[0].icon + "</i>")
        // let jayson = toString(response.list[0].dt_txt)
        // jayson.slice(0, 9)
        // console.log(response.list[0].dt_txt)
        // $(".date").html("<h4> Date: " + response.list[0].dt_txt)
        console.log(response.list[0].weather[0].icon)

        console.log(response.list[0].main.temp)//temp
        let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
        $(".temp").text("Average temperature: " + Math.round(tempF) + "°F");

        console.log(response.list[0].main.humidity)//humidity
        $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%")

        console.log(response.list[0].wind)//wind speed
        $(".wind").text("Avg Wind Speed: " + response.list[0].wind.speed + "Mph")

        console.log(response.city.country)//uv index

        console.log(response.list[1].dt_txt)
    
        console.log(response)
            // make a loop to display 5 more days in the weather forecast
            function fiveDayCast() {
                for (i = 0; i < 5; i++) {
    
                    let div = $("<div>").addClass("cardborder col-sm-2")
                    let dt = $("<p></p>").addClass("card-title").text(response.list[i * 8].dt_txt)
                    let pic = $("<p></p>").text(response.list[i * 8].weather[0].icon)
                    var tempF = (response.list[i + 8].main.temp - 273.15) * 1.80 + 32;
                    let tempcast = $("<p></p>").text("Temp: " + Math.round(tempF) + "°F")
                    let humidcast = $("<p></p>").text("Humidity: " + response.list[i * 8].main.humidity + "%")
    
                    //icon if statement
                    // console.log(dt)
    
                    $("#forecast").append(div)
                    $(div).append(dt)
                    $(div).append(pic)
                    $(div).append(tempcast)
                    $(div).append(humidcast)
                    $(dt).addClass("fontstyle")
                }
            }
            function clearBox() {
                $("#forecast").text("");
            }
            console.log(clearBox)
            clearBox();
            fiveDayCast();
    });

    $("#cityStore").empty();
    cityList();


})


$("#foreCast").on("click", function () {

    // let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"
    // let city = $("#city_search").val();
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

    
})


function cityList() {
    for(i = 0; i < cityArr.length; i++) {

        let cd = $("<p>").text(cityArr[i])

        $("#cityStore").append(cd)
    }
}


// console.log()
// * Current conditions

// * 5-Day Forecast

// * Search history

// * UV index

