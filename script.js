// Selectors
const cityName = document.querySelector("#cityName");
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const temperature = document.querySelector("#temp");
const sky = document.querySelector("#sky");
const image = document.querySelector(".global-icon");
const details = document.querySelectorAll(".day-details");
const weatherContainer = document.querySelector(".weather-container");
const searchMessage = document.querySelector(".search-message");
const errorMessage = document.querySelector(".error-message");
const addBtn = document.querySelector(".add");

// end of Selectors

const KEY = "b099b0a33239890f3def00176432d87a";

const today = new Date();

const weatherIcons = {
  clear: "/Assets/icons8-sun-100.png",
  storm: "/Assets/icons8-cloud-lightning-100.png",
  drizzle: "/Assets/icons8-hail-100.png",
  rain: "./Assets/icons8-rain-100.png",
  snow: "/Assets/icons8-snow-100.png",
  dust: "/Assets/icons8-dust-100.png",
  clouds: "/Assets/icons8-cloud-100.png",
};

const fetchWeatherData = async () => {
  const res = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value.trim()}&appid=${KEY}&units=metric`
    )
    .catch((e) => e);

  const data = res.data;
  const error = res instanceof Error;
  if (error) {
    weatherContainer.style.display = "none";
    searchMessage.style.display = "none";
    errorMessage.style.display = "block";
    cityName.value = "";
  }

  if (data.cod === 200) {
    weatherContainer.style.display = "block";
    searchMessage.style.display = "none";
    errorMessage.style.display = "none";

    const weatherData = {
      cityName: data.name,
      date: today.toLocaleDateString("en-US"),
      temperature: `${Math.floor(data.main.temp)}\u00B0C`,
      skyCondition: data.weather[0].main,
      windSpeed: `${Math.floor(data.wind.speed)}m/s`,
      humidity: `${data.main.humidity} %`,
      imageSrc: image.src,
    };

    city.innerText = weatherData.cityName;
    date.innerText = weatherData.date;
    temperature.innerText = weatherData.temperature;
    sky.innerText = weatherData.skyCondition;
    wind.innerText = weatherData.windSpeed;
    humidity.innerText = weatherData.humidity;
    if (data.weather[0].id < 300) {
    } else if (data.weather[0].id <= 500) {
      image.src = weatherIcons.drizzle;
    } else if (data.weather[0].id <= 600) {
      image.src = weatherIcons.rain;
    } else if (data.weather[0].id <= 700) {
      image.src = weatherIcons.dust;
    } else if (data.weather[0].id === 800) {
      image.src = weatherIcons.clear;
    } else {
      image.src = weatherIcons.clouds;
    }
    cityName.value = "";
    currentData = weatherData;
  }
};
const fetchForcastData = async () => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&appid=${KEY}&units=metric`
  );
  const { list } = await res.data;
  const element = list.filter((el) => el.dt_txt.includes("00:00:00"));

  for (let i = 0; i < element.length; i++) {
    const time = new Date(element[i].dt * 1000).toLocaleDateString("en-US");
    details[i].querySelector("h3").textContent = time;
    details[i].querySelector("h4").textContent = `${Math.floor(
      element[i].main.temp
    )}\u00B0C `;

    if (element[i].weather[0].id < 300) {
    } else if (element[i].weather[0].id <= 500) {
      details[i].querySelector("img").src = weatherIcons.drizzle;
    } else if (element[i].weather[0].id <= 600) {
      details[i].querySelector("img").src = weatherIcons.rain;
    } else if (element[i].weather[0].id <= 700) {
      details[i].querySelector("img").src = weatherIcons.dust;
    } else if (element[i].weather[0].id === 800) {
      details[i].querySelector("img").src = weatherIcons.clear;
    } else {
      details[i].querySelector("img").src = weatherIcons.clouds;
    }
  }
};

search.addEventListener("click", () => {
  fetchWeatherData();
  fetchForcastData();
});
