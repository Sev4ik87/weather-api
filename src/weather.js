'use strict';
const apiKey = 'a3ea19dcf0ed9baeee3f965f1aabc431';

const inputCityRadio = document.querySelector('input[value="city"]');
const inputIdRadio = document.querySelector('input[value="id"]');
const inputCity = document.getElementById('input-city');
const inputId = document.getElementById('input-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

inputCityRadio.addEventListener('change', () => {
  inputCity.disabled = false;
  inputId.disabled = true;
});

inputIdRadio.addEventListener('change', () => {
  inputCity.disabled = true;
  inputId.disabled = false;
});

const form = document.getElementById('weather-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  getWeather();
});

cancelBtn.addEventListener('click', clearWeather);

async function getWeather() {
  const cityName = inputCity.value.trim();
  const cityId = inputId.value.trim();

  let url;
  if (inputCityRadio.checked) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;
  }

  try {
    submitBtn.disabled = true; 
    const response = await fetch(url);
    const data = await response.json();

    const temperatureCelsius = kelvinToCelsius(data.main.temp); 
    temperature.textContent = `${temperatureCelsius} °C`; 
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity} %`;
  } catch (error) {
    console.log('Error:', error);
  } finally {
    submitBtn.disabled = false; 
  }
}

function clearWeather() {
  inputCity.value = '';
  inputId.value = '';
  temperature.textContent = '';
  windSpeed.textContent = '';
  humidity.textContent = '';
}
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
