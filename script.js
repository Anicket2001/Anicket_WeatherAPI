const apiKey = '92ede0493802e4307aa1225be105d88d'; // Replace with your actual API key
const defaultCity = 'Delhi';
const apiUrl = 'https://api.openweathermap.org/data/2.5';
const weatherInfo = document.getElementById('weatherInfo');
const chartContainer = document.getElementById('chartContainer');

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value || defaultCity;
    const currentWeather = await fetchCurrentWeather(cityInput);
    const forecast = await fetchWeatherForecast(cityInput);
  
    console.log('Current weather:', currentWeather);
    console.log('Forecast:', forecast);
  
    displayCurrentWeather(currentWeather);
    displayForecastChart(forecast);
  }
  

async function fetchCurrentWeather(city) {
  const response = await fetch(`${apiUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

async function fetchWeatherForecast(city) {
  const response = await fetch(`${apiUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

function displayCurrentWeather(weatherData) {
  weatherInfo.innerHTML = `
    <h2>Current Weather</h2>
    <p>City: ${weatherData.name}</p>
    <p>Condition: ${weatherData.weather[0].description}</p>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    <p>Date & Time: ${new Date(weatherData.dt * 1000)}</p>
  `;
}

function displayForecastChart(forecastData) {
    // Clear the previous chart
    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }
  
    const labels = [];
    const temperatureData = [];
    const humidityData = [];
  
    forecastData.list.forEach(item => {
      labels.push(new Date(item.dt * 1000).toLocaleDateString());
      temperatureData.push(item.main.temp);
      humidityData.push(item.main.humidity);
    });
  
    const ctx = document.getElementById('chartContainer').getContext('2d');
  
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Humidity (%)',
            data: humidityData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
  
  
  
  
  

// Initial call to get weather for default city
getWeather();
