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

  return `${day} ${hours}:${minutes}`;
}

function showPosition(position) {
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let input = document.querySelector("#request-geolocation");
input.addEventListener("click", getLocation);

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

  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let city = searchInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Warsaw");
