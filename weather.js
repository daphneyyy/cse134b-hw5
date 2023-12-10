class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        const apiUrl = "https://api.weather.gov/gridpoints/SGX/55,21/forecast";

        fetch(apiUrl).then((response) => response.json())
            .then((data) => {
                console.log(data);
                const curData = data.properties.periods[0];
                const temp = curData.temperature;
                const unit = curData.temperatureUnit;
                const curTemp = `${temp} \u00B0${unit}`;

                const shortForecast = curData.shortForecast;
                const curShortForecast = `${shortForecast}`;

                const weatherIcon = document.createElement('img');
                
                const forecastWords = shortForecast.split(' ');
                const weather = ['rainy', 'sunny', 'cloudy', 'foggy', 'snowy', 'windy'];
                const curWeather = forecastWords.find(w => weather.includes(w.toLowerCase()));
                if (curWeather === 'rainy') {
                    weatherIcon.src = "weather-icons/rainy.png";
                    weatherIcon.alt = "rainy";
                } else if (curWeather === 'sunny') {
                    weatherIcon.src = "weather-icons/sunny.png";
                    weatherIcon.alt = "sunny";
                } else if (curWeather === 'cloudy') {
                    weatherIcon.src = "weather-icons/cloudy.png";
                    weatherIcon.alt = "cloudy";
                } else if (curWeather === 'foggy') {
                    weatherIcon.src = "weather-icons/foggy.png";
                    weatherIcon.alt = "foggy";
                } else if (curWeather === 'snowy') {
                    weatherIcon.src = "weather-icons/snowy.png";
                    weatherIcon.alt = "snowy";
                } else if (curWeather === 'windy') {
                    weatherIcon.src = "weather-icons/windy.png";
                    weatherIcon.alt = "windy";
                } else {
                    weatherIcon.src = "weather-icons/clear.png";
                    weatherIcon.alt = "clear";
                }
                
                const relativeHumidity = curData.relativeHumidity.value;
                const curHumidity = `${relativeHumidity} %`;

                const windSpeed = curData.windSpeed;
                const windDirection = curData.windDirection;
                const curWind = `${windSpeed} ${windDirection}`;

                const weatherInfo = document.createElement('p');
                weatherInfo.textContent = `${curShortForecast} ${curTemp}`;

                const humidityInfo = document.createElement('p');
                humidityInfo.textContent = `Humidity: ${curHumidity}`;

                const windInfo = document.createElement('p');
                windInfo.textContent = `Wind: ${curWind}`;

                this.appendChild(weatherIcon);
                this.appendChild(weatherInfo);
                this.appendChild(humidityInfo);
                this.appendChild(windInfo);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                this.textContent = 'Unable to fetch weather data';
            });
    }
}

customElements.define('weather-widget', WeatherWidget);
