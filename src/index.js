function refreshWeather(response) {
  //console.log(response.data.temperature.current);
  let temperatureElemnt = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  temperatureElemnt.innerHTML = Math.round(temperature);
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
