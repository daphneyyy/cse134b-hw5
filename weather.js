class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        const apiUrl = "https://api.weather.gov/gridpoints/SGX/55,21/forecast";

        fetch(apiUrl).then((response) => response.json())
            .then((data) => {
                const curData = data.properties.periods[0];
                const temp = curData.temperature;
                const unit = curData.temperatureUnit;
                const curTemp = `${temp} \u00B0${unit}`;

                const shortForecast = curData.shortForecast;
                const curShortForecast = `${shortForecast}`;

                const relativeHumidity = curData.relativeHumidity.value;
                const curHumidity = `${relativeHumidity} %`;

                const weatherInfo = document.createElement('p');
                weatherInfo.textContent = `${curShortForecast} ${curTemp}`;

                const humidityInfo = document.createElement('p');
                humidityInfo.textContent = `Humidity: ${curHumidity}`;

                this.appendChild(weatherInfo);
                this.appendChild(humidityInfo);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                this.textContent = 'Unable to fetch weather data';
            });
    }
}

customElements.define('weather-widget', WeatherWidget);
