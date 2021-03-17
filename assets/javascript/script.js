var city="";

var searchCity = $("#city-input");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity= $("#humidity");
var currentWind=$("#wind-speed");
var currentUVindex= $("#uv-index");
var sCity=[];

var APIKey="1876ed65ab3cdf8b7a272096e11fe561";

function find(c){
    for (var i = 0; i < sCity.length; i++) {
        if(c.toUpperCase() === sCity[i]) {
            return -1;
        }
    }
    return 1;
}

function displayWeather(e) {
    e.preventDefault();
    if(searchCity.val() !== "") {
        city = searchCity.val();
        currentWeather(city);
    }
}

function currentWeather(city) {
    var currentWeatherAPI= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
    $.ajax({
        url: currentWeatherAPI,
        method:"GET",
    }).then(function(response) {
        console.log(response);
        var weathericon= response.weather[0].icon;
        var iconurl="http://openweathermap.org/img/wn/"+weathericon+"@2x.png";
        var date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name + "("+date+")" + "<img src="+iconurl+">");

        // convert K to F temperature
        var convertedTemp = (response.main.temp - 273.15) * 1.8 + 32;
        $(currentTemp).html((convertedTemp).toFixed(1)+"&#8457");
        $(currentHumidity).html(response.main.humidity+ "%");
        var ws = response.wind.speed;
        var windMPH = (ws * 2.237).toFixed(1);
        $(currentWind).html(windMPH + "MPH");
        UVIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }
    });
}

function UVIndex(ln, lt){
    var uvAPIURL="https://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url: uvAPIURL,
            method:"GET"
            }).then(function(response) {
                $(currentUVindex).html(response.value);
            });
}

function forecast(cityid) {
    var forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url: forecastAPIURL,
        method: "GET"
    }).then(function(response) {
        for (i = 0; i < 5; i++) {
            var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconCode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
            var tempInK = response.list[((i + 1) * 8) - 1].main.temp;
            var tempInF = (((tempInK - 273.5) * 1.8) + 32).toFixed(1);
            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $("#date"+i).html(date);
            $("#weatherImg"+i).html("<img src="+iconURL+">");
            $("#tempIndex"+i).html(tempInF + "&#8457");
            $("#humidityIndex"+i).html(humidity + "%");
        }
    });
}

function addToList(c) {
    var listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

function previousCity(e) {
    var liEl = e.target;
    if (e.target.matches("li")) {
        city = liEl.textContent;
        currentWeather(city);
    }
}

function loadCity() {
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if (sCity !== null) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < sCity.length; i++) {
            addToList(sCity[i]);
        }
        city = sCity[i - 1];
        currentWeather(city);
    }
}

function clearList(e) {
    e.preventDefault();
    sCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();
}

//button handlers
$("#search-button").on("click", displayWeather);
$("#clear-searches").on("click", clearList);
$(document).on("click", previousCity);
$(window).on("load", loadCity);
