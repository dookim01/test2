import React from 'react';

const LoadingSpinner = () => (
  <svg className="spinner" viewBox="0 0 24 24">
    <circle className="spinner-circle" cx="12" cy="12" r="10" />
    <path
      className="spinner-path"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default LoadingSpinner;