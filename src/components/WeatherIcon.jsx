import React from "react";
export default function WeatherIcon({ icon, description }) {
  return (
    <img
      className="weather-icon"
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description || 'Weather icon'}
      width="112"
      height="112"
    />
  );
}
