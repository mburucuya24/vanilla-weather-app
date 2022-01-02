function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[new Date().getMonth()];

  let number = new Date().getDate();
  let year = new Date().getFullYear();

  return `${day}, ${month} ${number}, ${year}<br />${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function updateWarsaw(event) {
  event.preventDefault();
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let city = "Warsaw";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function updateAsuncion(event) {
  event.preventDefault();
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let city = "Asuncion";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function updateSeoul(event) {
  event.preventDefault();
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let city = "Seoul";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function updateSeattle(event) {
  event.preventDefault();
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let city = "Seattle";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function updateWashingtondc(event) {
  event.preventDefault();
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let city = "Washington DC";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showPosition(position) {
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let cityElement = document.querySelector("#city");
  if (searchInput.value) {
    cityElement.innerHTML = searchInput.value;
  } else {
    cityElement.innerHTML = null;
    alert(`Please enter a city`);
  }

  search(searchInput.value);
}

function search(city) {
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="${
          forecastDay.weather[0].description
        }" class="icons"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span> | <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>             
                </div>
              </div>
            </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let windSpeed = response.data.wind.speed;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(windSpeed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  windSpeed = response.data.wind.speed;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(windSpeed / 1.609);

  let speedUnitsElement = document.querySelector("#speed-units");
  speedUnitsElement.innerHTML = `mi/h`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  windSpeed = response.data.wind.speed;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(windSpeed);

  let speedUnitsElement = document.querySelector("#speed-units");
  speedUnitsElement.innerHTML = `km/h`;
}

let celsiusTemperature = null;

let warsawLink = document.querySelector("#warsaw-city");
warsawLink.addEventListener("click", updateWarsaw);

let asuncionLink = document.querySelector("#asuncion-city");
asuncionLink.addEventListener("click", updateAsuncion);

let seoulLink = document.querySelector("#seoul-city");
seoulLink.addEventListener("click", updateSeoul);

let seattleLink = document.querySelector("#seattle-city");
seattleLink.addEventListener("click", updateSeattle);

let washingtondcLink = document.querySelector("#washingtondc-city");
washingtondcLink.addEventListener("click", updateWashingtondc);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let input = document.querySelector("#request-geolocation");
input.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Warsaw");
