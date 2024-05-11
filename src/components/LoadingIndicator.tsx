import React from 'react';
// import styles
import '../styles/LoadingIndicator.css';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading__indicator">
      <div className="loading__indicator-spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
