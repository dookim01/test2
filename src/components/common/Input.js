import React from 'react';

const Input = ({ label, error, ...props }) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <input className={`form-input ${error ? 'error' : ''}`} {...props} />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default Input;