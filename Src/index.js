let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let div = document.querySelector(".today");
div.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeatherCondition(response) {
  console.log(response.data);
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#descrip").innerHTML = response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = "da8bebb3e3f08446cad530447d5543ae";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "da8bebb3e3f08446cad530447d5543ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", displayCurrentLocation);
