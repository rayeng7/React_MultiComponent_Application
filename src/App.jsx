import React from "react";
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim();

async function fetchWeather(city) {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
    throw new Error('API_KEY_MISSING');
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.set('q', city);
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');

  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) throw new Error('CITY_NOT_FOUND');
    if (response.status === 401) throw new Error('API_KEY_INVALID');
    if (response.status === 429) throw new Error('RATE_LIMIT');
    throw new Error('REQUEST_FAILED');
  }
  return payload;
}

function getErrorMessage(error) {
  switch (error.message) {
    case 'API_KEY_MISSING':
      return 'Your API key is not configured. Create .env.local and add VITE_OPENWEATHER_API_KEY=your_key_here, then restart the dev server.';
    case 'CITY_NOT_FOUND':
      return 'We couldn’t find that city. Check the spelling and try again.';
    case 'API_KEY_INVALID':
      return 'OpenWeatherMap rejected the API key. Check that it is correct and activated.';
    case 'RATE_LIMIT':
      return 'Too many requests were made. Please wait a little and try again.';
    case 'Failed to fetch':
      return 'We couldn’t reach the weather service. Check your internet connection and try again.';
    default:
      return 'Something went wrong while getting the weather. Please try again.';
  }
}

export default function App() {
  const [query, setQuery] = useState('Beirut');
  const [requestedCity, setRequestedCity] = useState('Beirut');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    async function loadWeather() {
      setLoading(true);
      setError('');
      try {
        const result = await fetchWeather(requestedCity);
        if (!ignore) setWeather(result);
      } catch (err) {
        if (!ignore) {
          setWeather(null);
          setError(getErrorMessage(err));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadWeather();
    return () => { ignore = true; };
  }, [requestedCity]);

  function handleSearch(event) {
    event.preventDefault();
    const city = query.trim();
    if (!city) {
      setWeather(null);
      setError('Please enter a city name to search.');
      return;
    }
    setRequestedCity(city);
  }

  function retrySearch() {
    setRequestedCity('');
    window.setTimeout(() => setRequestedCity(query.trim() || 'Beirut'), 0);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="SkyCast home">
          <span className="brand-mark" aria-hidden="true">☀</span>
          <span>skycast<span className="brand-dot">.</span></span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> CURRENT WEATHER</span>
      </header>

      <section className="intro">
        <p className="eyebrow">YOUR LITTLE WINDOW TO THE WORLD</p>
        <h1>Weather, <span>made simple.</span></h1>
        <p className="intro-copy">A clear look at what’s happening outside, wherever you are.</p>
      </section>

      <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

      <section className="results-area" aria-live="polite" aria-busy={loading}>
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorMessage message={error} onRetry={retrySearch} />}
        {!loading && !error && weather && <WeatherCard weather={weather} />}
      </section>

      <footer className="footer">
        <span>Made for curious skies.</span>
        <span>Weather data by OpenWeatherMap</span>
      </footer>
    </main>
  );
}
