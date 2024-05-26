function refreshWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  // let minutes = date.getMinutes();
  let minutes = "0" + String(date.getMinutes());
  // let hours = date.getHours();
  let hours = "0" + String(date.getHours());
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

  // if (minutes < 10) {
  //   minutes = `0${minutes}`;
  // }

  minutes = minutes.slice(-2);
  hours = hours.slice(-2);
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "03bee20de1a30b2029956ae8f8td490o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
  //next steps:
  // call the API
  // search for the city
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "03bee20de1a30b2029956ae8f8td490o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  // console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast">
          <div class="col-2">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon"/>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature-max"> ${Math.round(
                  day.temperature.maximum
                )}°</div>
                <div class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
          </div>      
      </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) {
    document.body.background = "";
    // закомментировал фоновые рисунки
    //      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/115/098/original/Spring-W-46.jpg";
    return `spring`;
  } else if (month >= 6 && month <= 8) {
    document.body.background = "";
    //      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/115/099/original/Summer-W-46.jpg";
    return `summer`;
  } else if (month >= 9 && month <= 11) {
    document.body.background = "";
    //      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/115/100/original/Autumn-W-46.jpg";
    return `autumn`;
  } else {
    document.body.background = "";
    //      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/114/931/original/Winter-W.jpg";
    return `winter`;
  }
}

let Season = getSeason();
console.log(Season);

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kharkiv");
