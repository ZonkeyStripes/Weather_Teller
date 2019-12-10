

$("#city_find").on("click", function(){
    
    let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"
    // let city = "tucson"
    var title = "";
    let city = $("#city_search").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL)
    
        // this logs the object of the url search
        console.log(response)
    
        console.log(response.city.name)//city name
        $(".city").html("<h2>" + response.city.name + " Weather")
    
        console.log(response.list[0].dt_txt)
        $(".date").html("<h3> Date: Today")
    
        console.log(response.list[0].main.temp)//temp
        var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
        $(".temp").text("Average temperature: " + Math.round(tempF) + "°F");
        
        console.log(response.list[0].main.humidity)//humidity
        $(".humidity").text("Humidity: " + response.list[0].main.humidity)
    
        console.log(response.list[0].wind)//wind speed
        $(".wind").text("Avg Wind Speed: " + response.list[0].wind.speed + "Mph")
    
        console.log(response.city.country)//uv index
    
    
    
    });

})



// * Current conditions

// * 5-Day Forecast

// * Search history

// * UV index

