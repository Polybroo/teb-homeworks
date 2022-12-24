class WeatherCard{
    constructor(){
    }
    setWind(value){
        this.wind.innerText = value;
    }
}
class WeatherForecastManager{
    constructor(cardsContainer, baseRequest){
        this.cardsContainer = cardsContainer;
        this.baseRequest = baseRequest;
        this.windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
        this.labelDictionary = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            56: "Light, freezing drizzle",
            57: "Dense, freezing drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            66: "Light, freezing rain",
            67: "Heavy, freezing rain",
            71: "Slight snow fall",
            73: "Moderate snow fall",
            75: "Heavy snow fall",
            77: "Snow grains",
            80: "Slight rain showers",
            81: "Moderate rain showers",
            82: "Violent rain showers",
            85: "Slight snow showers",
            86: "Heavy snow showers",
            95: "Thunderstorm",
            96: "Thunderstorm with slight hail",
            99: "Thunderstorm with heavy hail"
        };
        this.bubbleDictionary = {
            0: "rgba(255, 226, 140)",
            1: "rgba(166, 226, 247)",
            2: "rgba(189, 213, 222)",
            3: "rgba(166, 180, 186)",
            45: "rgba(178, 182, 184)",
            48: "rgba(199, 201, 201)",
            51: "rgba(177, 189, 187)",
            53: "rgba(160, 176, 173)",
            55: "rgba(135, 156, 152)",
            56: "rgba(141, 150, 168)",
            57: "rgba(122, 133, 153)",
            61: "rgba(168, 206, 227)",
            63: "rgba(87, 161, 222)",
            65: "rgba(86, 141, 219)",
            66: "rgba(87, 213, 222)",
            67: "rgba(67, 195, 204)",
            71: "rgba(176, 204, 209)",
            73: "rgba(186, 208, 214)",
            75: "rgba(176, 208, 217)",
            77: "rgba(195, 208, 212)",
            80: "rgba(95, 127, 222)",
            81: "rgba(73, 108, 214)",
            82: "rgba(52, 87, 194)",
            85: "rgba(134, 147, 189)",
            86: "rgba(113, 126, 171)",
            95: "rgba(48, 48, 186)",
            96: "rgba(48, 48, 186)",
            99: "rgba(48, 48, 186,)"
        };
    }
    createCard(data, name){
        var cardBox = document.createElement("div");
        var bubbleBox = document.createElement("div");
        var fieldsBox = document.createElement("div");
        this.cardsContainer.appendChild(cardBox);
        cardBox.appendChild(bubbleBox);
        cardBox.appendChild(fieldsBox);
        cardBox.className = "weathercard";
        bubbleBox.className = "weathercard-bubble";
        fieldsBox.className = "weathercard-fields-box";

        var bubbleLabel = document.createElement("p");
        var bubbleTemp = document.createElement("h2");
        var bubbleName = document.createElement("p");
        bubbleBox.appendChild(bubbleLabel);
        bubbleBox.appendChild(bubbleTemp);
        bubbleBox.appendChild(bubbleName);
        bubbleLabel.className = "weathercard-label";
        bubbleTemp.className = "weathercard-temperature";
        bubbleName.className = "weathercard-name";
        bubbleBox.style = "background-color: " + this.bubbleDictionary[data.current_weather.weathercode];
        bubbleLabel.innerText = this.labelDictionary[data.current_weather.weathercode];
        bubbleTemp.innerText = data.current_weather.temperature + "°C";
        bubbleName.innerText = name;

        var field = document.createElement("div");
        var fieldKey = document.createElement("p");
        var fieldValue = document.createElement("p");
        field.className = "weathercard-field"
        fieldKey.className = "weathercard-field-key"
        fieldValue.className = "weathercard-field-value"
        fieldKey.innerText = "Wind";
        fieldValue.innerText = this.windDirections[Math.round(data.current_weather.windspeed/22.5)] + " " + data.current_weather.windspeed + " km/h";
        field.appendChild(fieldKey);
        field.appendChild(fieldValue);

        var time = data.current_weather.time;
        var hourIndex = parseInt(time.substring(time.length - 5).substring(0, 2));

        var humidityField = field.cloneNode(true);
        var visibilityField = field.cloneNode(true);
        humidityField.firstChild.innerText = "Humidity";
        humidityField.lastChild.innerText = data.hourly.relativehumidity_2m[hourIndex] + "%";
        visibilityField.firstChild.innerText = "Visibility";
        var visibVal = data.hourly.visibility[hourIndex];
        visibilityField.lastChild.innerText = visibVal >= 1000.0 ? Math.round(visibVal / 1000.0) + " km": visibVal + " m";

        fieldsBox.appendChild(field);
        fieldsBox.appendChild(humidityField);
        fieldsBox.appendChild(visibilityField);
    }
    async getWeatherData(latitude, longitude){
        const res = await fetch(this.baseRequest.replace("LTTD", latitude).replace("LGTD", longitude));
        const json = await res.json();
        return json;
    }
}

window.onload = async () => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=LTTD&longitude=LGTD&timezone=auto&current_weather=true&hourly=relativehumidity_2m,visibility";
    const container = document.getElementById("weathercards");
    var forecastManager = new WeatherForecastManager(container, url);

    var warsawData = await forecastManager.getWeatherData(52.23, 21.01);
    var pragueData = await forecastManager.getWeatherData(50.08, 14.44);
    var wroclawData = await forecastManager.getWeatherData(51.10, 17.03);
    var bratData = await forecastManager.getWeatherData(48.15, 17.11);
    var krakowData = await forecastManager.getWeatherData(50.06, 19.95);

    forecastManager.createCard(warsawData, "Warsaw, Poland");
    forecastManager.createCard(pragueData, "Prague, Czech");
    forecastManager.createCard(wroclawData, "Wroclaw, Poland");
    forecastManager.createCard(bratData, "Bratislava, Slovakia");
    forecastManager.createCard(krakowData, "Krakow, Poland");
}