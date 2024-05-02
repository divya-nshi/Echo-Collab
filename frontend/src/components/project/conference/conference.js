import React, { useEffect } from 'react';

const Conference = () => {
  useEffect(() => {
    // Redirect to the specified URL
    window.location.href = 'https://echo-conferencing.vercel.app/';
  }, []);

  // Render nothing since the page will redirect immediately
  return null;
};

export default Conference;
