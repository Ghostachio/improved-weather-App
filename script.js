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
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${KEY}&units=metric`
  );
  const data = await res.data;
  city.innerText = data.name;
  date.innerText = today.toLocaleDateString("en-GB");
  temperature.innerText = `${Math.floor(data.main.temp)}\u00B0C`;
  sky.innerText = data.weather[0].main;
  wind.innerText = `${Math.floor(data.wind.speed)}m/s`;
  humidity.innerText = `${data.main.humidity} %`;
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
  console.log(data);
};
const fetchForcastData = async () => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&appid=${KEY}&units=metric`
  );
  const { list } = await res.data;
  const element = list.filter((el) => el.dt_txt.includes("00:00:00"));

  console.log(element);
};

search.addEventListener("click", () => {
  fetchWeatherData();
  fetchForcastData();
});
