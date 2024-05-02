import React, { useEffect } from 'react';

const Resumeanalyzer = () => {
  useEffect(() => {
    // Redirect to the specified URL
    window.location.href = 'https://resume-parser-eight.vercel.app/';
  }, []);

  // Render nothing since the page will redirect immediately
  return null;
};

export default Resumeanalyzer;
