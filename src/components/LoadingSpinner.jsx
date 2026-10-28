import React from "react";
export default function LoadingSpinner() {
  return (
    <div className="status-panel" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>Looking outside for you…</p>
      <span className="status-subtitle">Getting the latest weather</span>
    </div>
  );
}
