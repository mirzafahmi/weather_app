let weather = {
  apiKeys: "021723dabd539dfab7d1d24f81cd2f58",
  //fetching weather data from open weather map by cityname
  fetchWeather: function (cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKeys}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = `${name}, ${country}`;
    //convert temp from kelvin to celcius
    document.querySelector(".temp").innerText = `${(temp - 273).toFixed(2)}°C`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = `${description}`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed}km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  addLoading: function(){
    document.loading.style.removeProperties("display");
  }
};

//search by hitting search icon
document
  .querySelector(".search button")
  .addEventListener("click", () => {
  weather.search();
  weather.addLoading();
});

//search by hitting enter key
document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    weather.search();
    weather.addLoading();
  }
});
