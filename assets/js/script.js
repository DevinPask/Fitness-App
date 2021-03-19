var weatherAPIKey="1876ed65ab3cdf8b7a272096e11fe561";
var gymAPIKey = "https://www.google.com/maps/search/?api=1&query=gyms";

// async function currentWeather() {
//     let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=san%20jose&appid=1876ed65ab3cdf8b7a272096e11fe561');
//     let data = await response.json();
//     console.log(data);
// }

// currentWeather();
///var weathermain = data["weather"]["main"];
//console.log(weathermain);
const weatherValue = document.querySelector('.weath');
const descValue = document.querySelector('.description');
const tempValue = document.querySelector('.temp');
const windValue = document.querySelector('.wind');
const sunriseValue = document.querySelector('.sunrise');
const sunsetValue = document.querySelector('.sunset');


function postWeather() {
  weatherValue.innerHTML = main;
  descValue.innerHTML = description;
  tempValue.innerHTML =temp;
  windValue.innerHTML = wind;
  sunriseValue.innerHTML = sunrise;
  sunsetValue.innerHTML = sunset;
}

const Http = new XMLHttpRequest();
const url='http://api.openweathermap.org/data/2.5/weather?q=san%20jose&units=imperial&appid=1876ed65ab3cdf8b7a272096e11fe561';
Http.open("GET", url);
Http.send();
Http.onreadystatechange = (e) => {
  var data = Http.responseText
  //console.log(data)
var output = JSON.parse(data)
//weather main
var main = output.weather[0].main
//weather description
var description = output.weather[0].description
//weather temp
var temp = output.main.temp
//wind speed
var wind = output.wind.speed
//sunrise time
var sunrise = output.sys.sunrise
var dsunrise = new Date(sunrise*1000);
//sunset time
var sunset = output.sys.sunset
var dsunset = new Date(sunset*1000);
console.log(main,description,temp,wind,sunrise,sunset);

function postWeather() {
  weatherValue.innerHTML = main;
  descValue.innerHTML = description;
  tempValue.innerHTML = `${Math.floor(temp)}°F`;
  windValue.innerHTML = `Wind: ${Math.floor(wind)}mph`;
  sunriseValue.innerHTML = `Sunrise: ${dsunrise.toTimeString()} AM`;
  sunsetValue.innerHTML = `Sunset: ${dsunset.toTimeString()} PM`;
}
postWeather();
}
// call each variable in the html to call whatever info we want to display on the page 
