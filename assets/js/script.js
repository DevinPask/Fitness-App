var weatherAPIKey="1876ed65ab3cdf8b7a272096e11fe561";
var gymAPIKey = "https://www.google.com/maps/search/?api=1&query=gyms";

async function currentWeather() {
    let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=san%20jose&appid=1876ed65ab3cdf8b7a272096e11fe561');
    let data = await response.json();
    console.log(data);
}

currentWeather();
///var weathermain = data["weather"]["main"];
//console.log(weathermain);