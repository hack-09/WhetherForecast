document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherInfo = document.getElementById("weatherInfo");
  let weatherIcon = null; // Store the reference to the weather icon element

  getWeather("Ludhiana");
  searchBtn.addEventListener("click", function() {
    const cityName = cityInput.value;
    if (cityName !== "") {
      getWeather(cityName);
    }
  });

  function getWeather(cityName) {
    const apiKey = "c8c56e6a28f9678f8a234d0bcf251745"; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weatherDescription = data.weather[0].description;
        const temperature = Math.round(data.main.temp - 273.15);
        const humidity = data.main.humidity;

        const weatherHTML = `
          <h2>${cityName}</h2>
          <p>Weather: ${weatherDescription}</p>
          <p>Temperature: ${temperature}°C</p>
          <p>Humidity: ${humidity}%</p>
        `;

        box.innerHTML = weatherHTML;

        const weatherConditionCode = data.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/w/${weatherConditionCode}.png`;

        // Remove the previous weather icon if it exists
        if (weatherIcon) {
          weatherIcon.remove();
        }

        // Create and append the new weather icon
        weatherIcon = document.createElement("img");
        weatherIcon.src = weatherIconUrl;

        weatherInfo.appendChild(weatherIcon);
      })
      .catch(error => {
        console.log("Error:", error);
        weatherInfo.innerHTML = "<p>Failed to fetch weather data. Please try again.</p>";
      });
  }
});
