import React from "react";
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-panel error-panel" role="alert">
      <span className="error-symbol" aria-hidden="true">!</span>
      <h2>We hit a little cloud.</h2>
      <p>{message}</p>
      <button className="retry-button" type="button" onClick={onRetry}>Try again</button>
    </div>
  );
}
