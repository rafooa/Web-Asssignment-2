import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "92481c1d37c38168304e11eb3c7718aa";

const FourDayForecast = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const dailyData = response.data.list
          .filter((reading) => reading.dt_txt.includes("12:00:00"))
          .slice(0, 4);
        setForecastData(dailyData);
      } catch (err) {
        setError("Error fetching forecast data");
        console.error("Error fetching forecast data:", err);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!forecastData.length) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-md max-w-sm mx-auto mt-4">
      <h3 className="text-lg font-bold mb-2 text-center">4-Day Forecast</h3>
      <div>
        {forecastData.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString(undefined, {
            weekday: "long",
          });
          const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          const temp = Math.round(day.main.temp);

          return (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="font-medium">{date}</span>
              <img
                src={iconUrl}
                alt={day.weather[0].description}
                className="w-8 h-8"
              />
              <span className="font-semibold">{temp}°C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FourDayForecast;
