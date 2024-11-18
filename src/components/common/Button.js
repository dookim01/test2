import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({ children, isLoading, variant = 'primary', ...props }) => (
  <button
    className={`button ${variant} ${isLoading ? 'loading' : ''}`}
    disabled={isLoading}
    {...props}
  >
    {isLoading && <LoadingSpinner />}
    {children}
  </button>
);

export default Button;