import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "92481c1d37c38168304e11eb3c7718aa";

const CurrentWeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("Error fetching weather data");
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeather();
  }, [city]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weatherData) return <p className="text-center">Loading...</p>;

  const { main, name, weather } = weatherData;
  const temperature = main?.temp ? Math.round(main.temp) : "N/A";
  const description = weather?.[0]?.description || "No description available";
  const weatherIconUrl = weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    : "";

  return (
    <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-md max-w-sm mx-auto my-4">
      <h2 className="text-2xl font-bold mb-2 text-center">
        {name || "Unknown City"}
      </h2>
      <div className="flex items-center justify-center">
        {weatherIconUrl && (
          <img
            src={weatherIconUrl}
            alt={description}
            className="w-16 h-16 mr-4"
          />
        )}
        <div>
          <p className="text-3xl font-semibold">{temperature}°C</p>
          <p className="text-gray-600 capitalize">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
