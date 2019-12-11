let d = new Date();
console.log(d)
$("#date").text(d)
$("#city_find").on("click", function () {

    let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"
    // let city = "tucson"
    let city = $("#city_search").val();
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL)

        // this logs the object of the url search
        console.log(response)

        console.log(response.city.name)//city name
        $(".city").html("<h2>" + response.city.name + " Weather")

        let jayson = toString(response.list[0].dt_txt)
        jayson.slice(0, 9)
        console.log(response.list[0].dt_txt)
        $(".date").html("<h4> Date: " + response.list[0].dt_txt)

        console.log(response.list[0].main.temp)//temp
        var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
        $(".temp").text("Average temperature: " + Math.round(tempF) + "°F");

        console.log(response.list[0].main.humidity)//humidity
        $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%")

        console.log(response.list[0].wind)//wind speed
        $(".wind").text("Avg Wind Speed: " + response.list[0].wind.speed + "Mph")

        console.log(response.city.country)//uv index

        console.log(response.list[1].dt_txt)

        

    });

})


$("#foreCast").on("click", function () {

    let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"
    // let city = "tucson"
    let city = $("#city_search").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // make a loop to display 5 more days in the weather forecast
        function fiveDayCast() {
            for (i = 0; i < 5; i++) {

                let div = $("<div>").addClass("cardborder col-sm-2")
                let dt = $("<p></p>").addClass("card-title").text(response.list[i * 8].dt_txt)
                // let pic = $("<p></p>").text("Picture")
                var tempF = (response.list[i + 8].main.temp - 273.15) * 1.80 + 32;
                let tempcast = $("<p></p>").text("Temp: " + Math.round(tempF) + "°F")
                let humidcast = $("<p></p>").text("Humidity: " + response.list[i * 8].main.humidity + "%")

                console.log(dt)

                $("#forecast").append(div)
                $(div).append(dt)
                $(div).append(tempcast)
                $(div).append(humidcast)
            }
        }
        function clearBox() {
            $("#forecast").text("");
        }
        console.log(clearBox)
        clearBox();
        fiveDayCast();
    })
})

console.log()
// * Current conditions

// * 5-Day Forecast

// * Search history

// * UV index

