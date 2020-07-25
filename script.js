$(document).ready(function () {

    var searchInput;
    var currentTime = moment().format("MMM Do YY");

    //pull value stored in API1 key and create a variable for it
    var currentWeatherCity = JSON.parse(localStorage.getItem("API1")) || {};
    console.log(currentWeatherCity)

    var currentWeatherData = []

    var divCurrentTime = $("<div>");
    $("#dateValue").append(divCurrentTime).text("|" + currentTime);

    for (var i = 0; i < currentWeatherCity.length; i++) {
        var previousSearchBtn = $("<button>");
        previousSearchBtn.attr("class", "test");
        previousSearchBtn.text(currentWeatherCity[i]);
        $(".previousSearch").append(previousSearchBtn);
    }


    //click event on the search button to retrieve current weather data and 5 day forecast plus store data into localestorage
    $("#searchBtn").on("click", function (event) {
        // event.preventDefault();
        //grab input data
        searchInput = $("#searchInput").val();
        
        //dynamically create buttons
        var searchInputBtn = $("<button>")
        searchInputBtn.text(searchInput)
        $(".previousSearch").append(searchInputBtn)

        //set class attribute class to test
        searchInputBtn.attr("class", "test");


        // console.log(searchInput);
        var apiKey = "c5d938973bdc5719520478ee24918737";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;

        //store searchInput into the currentWeatherData array into local storage
        currentWeatherData.push(searchInput)
        console.log("currentweather" + currentWeatherData)

        localStorage.setItem("API1", JSON.stringify(currentWeatherData));


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
     
            $("#cityValue").text(response.name);
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $("#day1icon").attr("src", iconurl)
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#tempValue").text(tempF.toFixed(0) + " F");
            $("#windValue").text(response.wind.speed);
            var lat = response.coord.lat
            var lon = response.coord.lon
            var cityId = response.id
            var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                $("#uvValue").text(response.value);
            });
            var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response) {

                var day2val = response.list[0].dt_txt;
                day2val = moment.parseZone(day2val).format('MMM Do YYYY');
                $("#date2").text(day2val);
                var iconcode2 = response.list[0].weather[0].icon
                var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
                $("#icon2").attr("src", iconurl2)
                var day2TempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue2").text(day2TempF.toFixed(0));
                var humidity2 = (response.list[0].main.humidity)
                $("#humidityValue2").text(humidity2)

                var day3val = response.list[8].dt_txt;
                day3val = moment.parseZone(day3val).format('MMM Do YYYY');
                $("#date3").text(day3val);
                var iconcode3 = response.list[8].weather[0].icon
                var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
                $("#icon3").attr("src", iconurl3)
                var day3TempF = (response.list[8].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue3").text(day3TempF.toFixed(0));
                var humidity3 = (response.list[8].main.humidity)
                $("#humidityValue3").text(humidity3)

                var day4val = response.list[16].dt_txt;
                day4val = moment.parseZone(day4val).format('MMM Do YYYY');
                $("#date4").text(day4val);
                var iconcode4 = response.list[16].weather[0].icon;
                var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
                $("#icon4").attr("src", iconurl4);
                var day4TempF = (response.list[16].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue4").text(day4TempF.toFixed(0));
                var humidity4 = (response.list[16].main.humidity);
                $("#humidityValue4").text(humidity4);


                //DAY 5 DATA
                var day5val = response.list[24].dt_txt;
                day5val = moment.parseZone(day5val).format('MMM Do YYYY');
                $("#date5").text(day5val);
                var iconcode5 = response.list[24].weather[0].icon;
                var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
                $("#icon5").attr("src", iconurl5);
                var day5TempF = (response.list[24].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue5").text(day5TempF.toFixed(0));
                var humidity5 = (response.list[24].main.humidity);
                $("#humidityValue5").text(humidity5);

                //DAY 6 DATA
                var day6val = response.list[32].dt_txt;
                day6val = moment.parseZone(day6val).format('MMM Do YYYY');
                $("#date6").text(day6val);
                var iconcode6 = response.list[32].weather[0].icon;
                var iconurl6 = "http://openweathermap.org/img/w/" + iconcode6 + ".png";
                $("#icon6").attr("src", iconurl6);
                var day6TempF = (response.list[32].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue6").text(day6TempF.toFixed(0));
                var humidity6 = (response.list[32].main.humidity);
                $("#humidityValue6").text(humidity6);

            });
        });

    });

    //click event on 
    $(document).on("click", ".test", function () {

        var btnValue = $(this).text();

        console.log("btnValue" + btnValue);

        var apiKey = "c5d938973bdc5719520478ee24918737";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + btnValue + "&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            $("#cityValue").text(response.name);
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $("#day1icon").attr("src", iconurl)
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#tempValue").text(tempF.toFixed(0) + " F");
            $("#windValue").text(response.wind.speed);
            var lat = response.coord.lat
            var lon = response.coord.lon

            var cityId = response.id


            var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                $("#uvValue").text(response.value);
            });

            var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response) {

                //DAY 2 DATA
                var day2val = response.list[0].dt_txt;
                day2val = moment.parseZone(day2val).format('MMM Do YYYY');
                $("#date2").text(day2val);
                var iconcode2 = response.list[0].weather[0].icon
                var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
                $("#icon2").attr("src", iconurl2)
                var day2TempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue2").text(day2TempF.toFixed(0));
                var humidity2 = (response.list[0].main.humidity)
                $("#humidityValue2").text(humidity2)

                //DAY 3 DATA
                var day3val = response.list[8].dt_txt;
                day3val = moment.parseZone(day3val).format('MMM Do YYYY');
                $("#date3").text(day3val);
                var iconcode3 = response.list[8].weather[0].icon
                var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
                $("#icon3").attr("src", iconurl3)
                var day3TempF = (response.list[8].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue3").text(day3TempF.toFixed(0));
                var humidity3 = (response.list[8].main.humidity)
                $("#humidityValue3").text(humidity3)

                //DAY 4 DATA
                var day4val = response.list[16].dt_txt;
                day4val = moment.parseZone(day4val).format('MMM Do YYYY');
                $("#date4").text(day4val);
                var iconcode4 = response.list[16].weather[0].icon;
                var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
                $("#icon4").attr("src", iconurl4);
                var day4TempF = (response.list[16].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue4").text(day4TempF.toFixed(0));
                var humidity4 = (response.list[16].main.humidity);
                $("#humidityValue4").text(humidity4);


                //DAY 5 DATA
                var day5val = response.list[24].dt_txt;
                day5val = moment.parseZone(day5val).format('MMM Do YYYY');
                $("#date5").text(day5val);
                var iconcode5 = response.list[24].weather[0].icon;
                var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
                $("#icon5").attr("src", iconurl5);
                var day5TempF = (response.list[24].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue5").text(day5TempF.toFixed(0));
                var humidity5 = (response.list[24].main.humidity);
                $("#humidityValue5").text(humidity5);

                //DAY 6 DATA
                var day6val = response.list[32].dt_txt;
                day6val = moment.parseZone(day6val).format('MMM Do YYYY');
                $("#date6").text(day6val);
                var iconcode6 = response.list[32].weather[0].icon;
                var iconurl6 = "http://openweathermap.org/img/w/" + iconcode6 + ".png";
                $("#icon6").attr("src", iconurl6);
                var day6TempF = (response.list[32].main.temp - 273.15) * 1.80 + 32;
                $("#tempValue6").text(day6TempF.toFixed(0));
                var humidity6 = (response.list[32].main.humidity);
                $("#humidityValue6").text(humidity6);

            });
        });
    })
})