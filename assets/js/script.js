// function that prints city buttons to page on page load
window.onload = function() {
    setSearchCity();
    var today = moment();
    $("#current-time").text(today.format("MMM Do, YYYY"));
}
// global variables

var searchBtn = document.querySelector("#search-btn");
// takes user city input, sets it in localstorage, and calls functions setAddCity() currentWeather() removeHidden(). Also stringifies the searched cities, and sets || (or) empty array
function searchVal (e) {
    var searchVal = document.querySelector("#user-search").value;
    e.preventDefault();
    var currentSearchData = window.localStorage.getItem('cities');
    var searchString = currentSearchData && JSON.parse(currentSearchData) || [];
    var searchdata = [...searchString, searchVal];
    var newSearchData = JSON.stringify(searchdata);
    window.localStorage.setItem("cities", newSearchData);
    setAddCity(searchVal);
    currentWeather(searchVal);
    removeHidden();
}

function setSearchCity() {
    var searchData = window.localStorage.getItem('cities');
    var parsedCities = searchData && JSON.parse(searchData) || [];
    parsedCities.forEach(city => {
        setAddCity(city);

    });
}
// creates new button element for the cities, and appends the city buttons to the page
function setAddCity(_city) {
    var cityList = document.createElement("button");
    cityList.classList.add('btn');
    cityList.addEventListener('click', sendCurrentWeather.bind(null, _city),  false);
    var text = document.createTextNode(_city);
    cityList.appendChild(text);
    var element = document.getElementById("current-day");
    element.appendChild(cityList);
}
// calls currentWeather and removes the class hidden
function sendCurrentWeather(e) {
    currentWeather(e);
    removeHidden();
}
// ties in API, then fetches data and runs runData and uVIndex functions
function currentWeather (searchCity) {
    var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiWeather + "&units=imperial";

    fetch(apiWeatherUrl)
    // change (response) and (data)
    .then(function (response) {
        return response.json()
    }) .then(function (data) {
        console.log(data);
        if (data) {
            runData(data);
            uVIndex(data);
        }
    }) .catch(error => {
        console.log(error);

    })
}
// creates the runData function, grabs the dom elements for temp, wind, humidity, and grabs the data from the APi. 
function runData(_data) {

$(".temp").text(_data.main.temp);
$(".wind").text(_data.wind.speed);
$(".humid").text(_data.main.humidity);



}

// function foreCast() {
//     var apiForecast = 
// }
// creates the uvIndex function, grabs the dom elements for uv index, and grabs the data from the APi. 
function uVIndex (param) {
    // need to find an API that can convert Dallas to latitude and longitude
    var lon = param.coord.lon;
    var lat = param.coord.lat;
    var newAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiWeather;
    fetch(newAPI) 
    .then(function (response) {
        return response.json()
    }) .then(function (data) {
        console.log(data);
        if (data) {
            $(".uv").text(data.current.uvi);
        }
    }) .catch(error => {
        console.log(error);
    })
    
}
// sets the removeHidden function to remove the class="hidden" (style=display=none) from the dom
function removeHidden() { 
    var hidden = Array.prototype.slice.call(document.querySelectorAll(".hidden"));
    hidden.forEach(function(item){
        item.classList.remove("hidden");
    })};



// added click event in the DOM



