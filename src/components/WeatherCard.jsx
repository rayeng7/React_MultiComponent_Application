import React from "react";
import WeatherIcon from './WeatherIcon.jsx';

function Stat({ icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <span className="stat-label">{label}</span>
      <strong>{value}<small>{unit}</small></strong>
    </div>
  );
}

export default function WeatherCard({ weather }) {
  const condition = weather.weather?.[0] || {};
  const description = condition.description || 'Current conditions';
  const temperature = Math.round(weather.main.temp);

  return (
    <article className="weather-card">
      <div className="weather-card-top">
        <div>
          <p className="date-label">{new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
          <h2>{weather.name}<span className="country">, {weather.sys?.country}</span></h2>
          <p className="weather-description">{description}</p>
        </div>
        <WeatherIcon icon={condition.icon} description={description} />
      </div>

      <div className="temperature-row">
        <div className="temperature">{temperature}<span>°</span></div>
        <div className="temperature-detail">
          <span>CELSIUS</span>
          <p>Feels like {Math.round(weather.main.feels_like)}°</p>
        </div>
      </div>

      <div className="condition-strip">
        <span className="condition-dot" />
        <span>{description.charAt(0).toUpperCase() + description.slice(1)}</span>
        <span className="strip-divider">•</span>
        <span>H: {Math.round(weather.main.temp_max)}°</span>
        <span>L: {Math.round(weather.main.temp_min)}°</span>
      </div>

      <div className="stats-grid">
        <Stat icon="💧" label="Humidity" value={weather.main.humidity} unit="%" />
        <Stat icon="💨" label="Wind speed" value={Number(weather.wind.speed).toFixed(1)} unit=" m/s" />
        <Stat icon="🌡️" label="Feels like" value={Math.round(weather.main.feels_like)} unit="°" />
        <Stat icon="◉" label="Pressure" value={weather.main.pressure} unit=" hPa" />
      </div>
    </article>
  );
}
