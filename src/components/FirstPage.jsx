import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png' // Adjust the path to your logo

function FirstPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/center'); // Redirect to the main page
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <img src={logo} alt="Company Logo" className='w-1/2' />
    </div>
  );
}

export default FirstPage;
