import React from "react";
export default function SearchBar({ query, onQueryChange, onSearch }) {
  return (
    <form className="search-form" onSubmit={onSearch} role="search">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <label className="sr-only" htmlFor="city-search">Search city</label>
      <input
        id="city-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search for a city..."
        autoComplete="off"
      />
      <button type="submit">Search <span aria-hidden="true">→</span></button>
    </form>
  );
}
