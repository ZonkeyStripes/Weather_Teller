let d = new Date();
$("#date").text(d)

let cityArr = []

if (localStorage.getItem("cities")) {
    cityArr = JSON.parse(localStorage.getItem("cities"))
}

function indexColor(i) {
    let indexClass = ""
    if (i < 4) {
        indexClass = "badge badge-success"
    } else if (i < 8) {
        indexClass = "badge badge-warning"
    } else {
        indexClass = "badge badge-danger"
    }
    return indexClass
}

$("#city_find").on("click", function find() {
    let city = $("#city_search").val();

    let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"
    city = city.charAt(0).toUpperCase() + city.slice(1)

    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.message === "city not found") {
            $("#here").innertext("Make sure the city was spelled correctly.")
        } else if (cityArr.indexOf(city) == -1) {
            cityArr.push(city)
            let cityString = JSON.stringify(cityArr)
            localStorage.setItem("cities", cityString)
        }
        console.log(response)

        let ultraVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&cnt=" + response.city.country
        $.ajax({
            url: ultraVURL,
            method: "GET"
        }).then(function (res) {
            console.log(ultraVURL)
            console.log(res.value)

            //city name 
            $(".city").html("<h2>" + response.city.name + " " + moment(response.list[0].dt_txt).format("MM/DD/YYYY"))

            let iconcode = response.list[0].weather[0].icon
            let iconURL = "https://openweathermap.org/img/w/" + iconcode + ".png";
            $("#wicon").attr('src', iconURL);


            let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;

            $(".temp").text("Average temperature: " + Math.round(tempF) + "°F");

            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%")

            $(".wind").text("Avg Wind Speed: " + response.list[0].wind.speed + "Mph")

            $(".uv").text("Ultra Violet Index: " + res.value).attr("class", indexColor(res.value))

            console.log(response.message)

            // make a loop to display 5 more days in the weather forecast
            function fiveDayCast() {
                let castline = $("<h2>").text("5 Day Weather Forecast")
                $("#headline").append(castline)
                for (i = 0; i < 5; i++) {

                    let div = $("<div>").addClass("cardborder col-sm-2")
                    let dt = $("<p></p>").addClass("card-title")
                    let formdt = moment(response.list[i * 8].dt_txt).format("MM/DD/YYYY")

                    let iconcodes = response.list[i * 8].weather[0].icon
                    let iconURLs = "https://openweathermap.org/img/w/" + iconcodes + ".png";


                    let pic = $("<img>").attr('src', iconURLs)
                    // text(response.list[i * 8].weather[0].icon)
                    var tempF = (response.list[i + 8].main.temp - 273.15) * 1.80 + 32;
                    let tempcast = $("<p></p>").text("Temp: " + Math.round(tempF) + "°F")
                    let humidcast = $("<p></p>").text("Humidity: " + response.list[i * 8].main.humidity + "%")

                    $("#forecast").append(div)
                    $(div).append(dt)
                    $(dt).append(formdt)
                    $(div).append(pic)
                    $(div).append(tempcast)
                    $(div).append(humidcast)
                    $(dt).addClass("fontstyle")
                }
            }
            function clearBox() {
                $("#forecast").text("");
            }
            clearBox();
            fiveDayCast();
        });//end of uv call
    })

    $("#appendCities").empty();
    cityList();
})
//clears city list
$("#clear").on("click", function () {
    $("#appendCities").empty();
    localStorage.clear();
})

//creates city list of searched cities
function cityList() {


    for (i = 0; i < cityArr.length; i++) {

        let td = $("<td>").text(cityArr[i]).addClass("clicko")
        let thead = $("<thead>").addClass("thead-dark")
        let th = $("<th>").attr("scope", "col")
        let tr = $("<tr>")

        $("#appendCities").append(thead)
        $(thead).append(tr)
        $(tr).append(th)

        $("#appendCities").append(tr)
        $(tr).append(td)
    }

}
$(".clicko").on("click", function(){
    alert("You pressed one of the cities.")
})

// on start ajax call for last city searched
function onstart() {

    let lastCity = cityArr[cityArr.length - 1];
    $("#city_search").val(lastCity)

    console.log(lastCity)
   
        let apiKey = "828d8c5dd2b3ef0673d597d675ed89f6"    
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + lastCity + "&APPID=" + apiKey;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
    
            let ultraVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&cnt=" + response.city.country
            $.ajax({
                url: ultraVURL,
                method: "GET"
            }).then(function (res) {
                console.log(ultraVURL)
                console.log(res.value)
    
                //city name 
                $(".city").html("<h2>" + response.city.name + " " + moment(response.list[0].dt_txt).format("MM/DD/YYYY"))
    
                let iconcode = response.list[0].weather[0].icon
                let iconURL = "https://openweathermap.org/img/w/" + iconcode + ".png";
                $("#wicon").attr('src', iconURL);
    
    
                let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    
                $(".temp").text("Average temperature: " + Math.round(tempF) + "°F");
    
                $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%")
    
                $(".wind").text("Avg Wind Speed: " + response.list[0].wind.speed + "Mph")
    
                $(".uv").text("Ultra Violet Index: " + res.value).attr("class", indexColor(res.value))
    
                console.log(response.message)
    
                // make a loop to display 5 more days in the weather forecast
                function fiveDayCast() {
                    let castline = $("<h2>").text("5 Day Weather Forecast")
                    $("#headline").append(castline)
                    for (i = 0; i < 5; i++) {
    
                        let div = $("<div>").addClass("cardborder col-sm-2")
                        let dt = $("<p></p>").addClass("card-title")
                        let formdt = moment(response.list[i * 8].dt_txt).format("MM/DD/YYYY")
    
                        let iconcodes = response.list[i * 8].weather[0].icon
                        let iconURLs = "https://openweathermap.org/img/w/" + iconcodes + ".png";
    
    
                        let pic = $("<img>").attr('src', iconURLs)
                        // text(response.list[i * 8].weather[0].icon)
                        var tempF = (response.list[i + 8].main.temp - 273.15) * 1.80 + 32;
                        let tempcast = $("<p></p>").text("Temp: " + Math.round(tempF) + "°F")
                        let humidcast = $("<p></p>").text("Humidity: " + response.list[i * 8].main.humidity + "%")
    
                        $("#forecast").append(div)
                        $(div).append(dt)
                        $(dt).append(formdt)
                        $(div).append(pic)
                        $(div).append(tempcast)
                        $(div).append(humidcast)
                        $(dt).addClass("fontstyle")
                    }
                }
                function clearBox() {
                    $("#forecast").text("");
                }
                clearBox();
                fiveDayCast();
            });//end of uv call
        })
        cityList();
}
