import "./App.css";
import CurrentWeatherDisplay from "./components/CurrentWeather";
import SearchBar from "./components/SearchBar";
import FourDayForecast from "./components/FourDayForecast";
import axios from "axios";
import { useState } from "react";

const API_KEY = "92481c1d37c38168304e11eb3c7718aa";

const App = () => {
  const [city, setCity] = useState("New York");
  const [coords, setCoords] = useState({ lat: 40.7128, lon: -74.006 });

  const handleCityChange = async (newCity) => {
    setCity(newCity);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${API_KEY}`
      );
      const { lat, lon } = response.data.coord;
      setCoords({ lat, lon });
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white">
      <div className="container mx-auto p-4">
        <SearchBar onSearch={handleCityChange} />
        <CurrentWeatherDisplay city={city} />
        <FourDayForecast lat={coords.lat} lon={coords.lon} />
      </div>
    </div>
  );
};

export default App;
