const apiKey = "b0f1edf7cd200b13e803b382fa8c776d";
const searchInput = document.querySelector("#locationInput");
const getWeatherBtn = document.querySelector("#getWeatherBtn");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const weatherIcon = document.querySelector(".icons");
const date = document.querySelector(".day");
const descCard = document.querySelector(".desc_card");
const weatherInfo = document.querySelector(".weather_info");
const defaultCity = "bengaluru";
const celsiusBtn = document.querySelector("#celsius");
const fahrenheitBtn = document.querySelector("#fahrenheit");
let defaultUnit = "metric";

// Function to add Current Date
const addCurrentDate = () => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  date.innerHTML = formattedDate;
};

addCurrentDate();

// Fetch weather using Search button
getWeatherBtn.addEventListener("click", () => {
  const location = searchInput.value;
  if (location.trim() === "") {
    alert("Please enter a location");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${defaultUnit}`
  )
    .then((response) => response.json())
    .then((data) => {
      const cityname = data.name;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const maxTemp = data.main.temp_max;
      const minTemp = data.main.temp_min;
      const windSpeed = data.wind.speed;
      const description = data.weather[0].description;
      const main = data.weather[0].main;

      cityName.innerHTML = cityname;
      if (defaultUnit === "metric") {
        temp.innerHTML = `${temperature} &#8451;`; // Display in Celsius
      } else {
        temp.innerHTML = `${temperature} &#8457;`; // Display in Fahrenheit
      }
      condition.innerHTML = main;

      weatherIcon.className = "icons";
      switch (main) {
        case "Clouds":
          weatherIcon.classList.add("clouds");
          break;
        case "Clear":
          weatherIcon.classList.add("clear-sky");
          break;
        default:
          break;
      }

      descCard.innerHTML = ` <h3 class="text-white text-center font-bold p-2">Description</h3>
      <div
        class="d-flex justify-content-center align-items-center desc_title"
      >
        <p class="text-white text-center font-bold">${description}</p>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Wind Speed</th>
            <td>${windSpeed}</td>
            <td>
              <img src="/assets/storm-icon.png" class="small_icon" alt="icon" />
            </td>
          </tr>
          <tr>
            <th>Humidity</th>
            <td>${humidity}</td>
            <td>
              <img
                src="/assets/humidity.png"
                class="small_icon"
                alt="icon"
              />
            </td>
          </tr>
          <tr>
            <th>Max Temp</th>
            <td>${maxTemp}</td>
            <td>
              <img
                src="/assets/high-temperature.png"
                class="small_icon"
                alt="icon"
              />
            </td>
          </tr>
          <tr>
            <th>Min Temp</th>
            <td>${minTemp}</td>
            <td>
              <img
                src="/assets/low-temperature.png"
                class="small_icon"
                alt="icon"
              />
            </td>
          </tr>
          <tr>
            <th>Pressure</th>
            <td>${pressure}</td>
            <td>
              <img
                src="/assets/atmospheric.png"
                class="small_icon"
                alt="icon"
              />
            </td>
          </tr>
        </tbody>
      </table>`;
    });
});

const fetchWeatherData = (location, defaultUnit) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${defaultUnit}`
  )
    .then((response) => response.json())
    .then((data) => {
      const cityname = data.name;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const maxTemp = data.main.temp_max;
      const minTemp = data.main.temp_min;
      const windSpeed = data.wind.speed;
      const description = data.weather[0].description;
      const main = data.weather[0].main;

      cityName.innerHTML = cityname;
      temp.innerHTML = temperature;
      condition.innerHTML = main;

      weatherIcon.className = "icons";
      switch (main) {
        case "Clouds":
          weatherIcon.classList.add("clouds");
          break;
        case "Clear":
          weatherIcon.classList.add("clear-sky");
          break;
        default:
          break;
      }

      descCard.innerHTML = ` <h3 class="text-white text-center font-bold p-2">Description</h3>
        <div
          class="d-flex justify-content-center align-items-center desc_title"
        >
          <p class="text-white text-center font-bold">${description}</p>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Wind Speed</th>
              <td>${windSpeed}</td>
              <td>
                <img src="/assets/storm-icon.png" class="small_icon" alt="icon" />
              </td>
            </tr>
            <tr>
              <th>Humidity</th>
              <td>${humidity}</td>
              <td>
                <img
                  src="/assets/humidity.png"
                  class="small_icon"
                  alt="icon"
                />
              </td>
            </tr>
            <tr>
              <th>Max Temp</th>
              <td>${maxTemp}</td>
              <td>
                <img
                  src="/assets/high-temperature.png"
                  class="small_icon"
                  alt="icon"
                />
              </td>
            </tr>
            <tr>
              <th>Min Temp</th>
              <td>${minTemp}</td>
              <td>
                <img
                  src="/assets/low-temperature.png"
                  class="small_icon"
                  alt="icon"
                />
              </td>
            </tr>
            <tr>
              <th>Pressure</th>
              <td>${pressure}</td>
              <td>
                <img
                  src="/assets/atmospheric.png"
                  class="small_icon"
                  alt="icon"
                />
              </td>
            </tr>
          </tbody>
        </table>`;
    });

  fahrenheitBtn.addEventListener("click", () => {
    defaultUnit = "imperial";
    fetchWeatherData(location, defaultUnit);
  });
  celsiusBtn.addEventListener("click", () => {
    defaultUnit = "metric";
    fetchWeatherData(location, defaultUnit);
  });
};

searchInput.value = "";

window.addEventListener("load", () => {
  fetchWeatherData(defaultCity, defaultUnit);
});
