# Assignment 5 — React Multi-Component Weather Dashboard

A responsive React weather dashboard built with Vite and OpenWeatherMap. It demonstrates reusable components, `useState`, `useEffect`, props, and conditional rendering.

## Requirements covered
- Vite-based React project; start with `npm run dev`
- Separate files for each component
- Functional components and hooks only
- Components: `SearchBar`, `WeatherCard`, `LoadingSpinner`, `ErrorMessage`, and `WeatherIcon`
- `useState` manages the query, weather data, loading state, and error message
- `useEffect` fetches initial Beirut weather and responds to submitted city searches
- Props pass values and callbacks between parent and child components
- Conditional loading, error, and success states
- Responsive layout for mobile and desktop

## Setup
1. Install Node.js (includes npm).
2. Open this folder in VS Code.
3. In the terminal, run `npm install`.
4. Copy `.env.example` to a new file named `.env.local`.
5. In `.env.local`, replace the placeholder with your OpenWeatherMap API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_key_here
   ```

   Do not commit `.env.local` to GitHub. Variables with the `VITE_` prefix are included in browser code, so this is suitable for a learning assignment, not a production secret.

6. Start the app:

   ```bash
   npm run dev
   ```

7. Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Try it
- Beirut weather loads by default.
- Search another city, such as Paris or Tokyo.
- Search for a made-up city to test the error state.
- A newly created API key may take time to activate.

## Component architecture
`App` owns the weather data and request status because the search form and weather display both need them. It passes only necessary data and callbacks to child components, keeping state lifting simple and avoiding excessive prop drilling.

## Production build
Run `npm run build` to generate the `dist/` folder.
## Submission

- Source code is organized into separate React component files.
- `node_modules/` and `dist/` are excluded from the submission ZIP.
- `.env.local` is excluded from version control and must not be included in the ZIP.
- Install dependencies with `npm install` before running the application.

## GitHub Repository

[React Multi-Component Application](https://github.com/rayeng7/React_MultiComponent_Application)

## Verification

Before submission, verify that the application runs with `npm run dev` and that `npm run build` completes successfully.
