import React, { useState } from 'react';
import logo from '../assets/logo.png';
import moon from '../assets/icon-moon.svg';
import sun from '../assets/icon-sun.svg';
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { motion } from 'framer-motion';

function Header() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide((state) => !state);
  };

  return (
    <div>
      {/* HEADER */}
      <header 
        className='lg:hidden h-[80px] z-50 duration-300 ease-in-out p-4 dark:bg-[#F5F7F8] bg-[#434343] flex items-center justify-end'>
        {/* LOGO IMG */}
        <img src={logo} alt='logo-image' className='h-[80px] absolute top-1 left-2' style={{ maxWidth: '70px', maxHeight: '70px' }} />
        {/* RIGHT SIDE */}
        <div className='flex items-center'>
          {/* DARK MODE BUTTON */}
          {colorTheme === 'light' ?
            <motion.img
              initial={{
                scale: 0.6, rotate: 90
              }}
              animate={{
                scale: 1,
                rotate: 360,
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              whileTap={{
                scale: 0.9,
                rotate: 15
              }}
              onClick={toggleDarkMode}
              src={moon}
              className='cursor-pointer ml-8 h-6'
            />
            :
            <motion.img
              initial={{
                rotate: 90
              }}
              animate={{
                scale: 1,
                rotate: 360,
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              whileTap={{
                scale: 0.9,
                rotate: 15
              }}
              onClick={toggleDarkMode}
              src={sun}
              className='cursor-pointer ml-8 h-6'
            />
          }
        </div>
        
      </header>

      {/* SIDE BAR */}
      <div className='z-50 hidden lg:block'>
        <div className='fixed z-50 w-[90px] rounded-1xl flex-col top-0 left-0 h-screen dark:bg-[#F8F8F8] bg-[#434343]'> 
          <div className='h-full w-full flex flex-col justify-between items-center'>
            {/* SIDE BAR */}
            <img src={logo} className='relative'/>

            {/* NAVIGATION SELECT */}
            <nav className='relative w-full flex flex-col items-center'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='w-full text-black text-sm bg-gray-300 hover:bg-gray-400 py-2 transition duration-300 ease-in-out font-bold text-center border-[#434343]'
              >
                Factures
              </button>
              {isDropdownOpen && (
                <div className='absolute top-full mt-2 w-full bg-white shadow-lg py-2 flex flex-col'>
                  <Link
                    to='/center'
                    className='w-full text-black text-sm bg-gray-300 hover:bg-gray-400 py-2 transition duration-300 ease-in-out font-bold text-center'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Facture 09%
                  </Link>
                  <Link
                    to='/center2'
                    className='w-full text-black text-sm bg-gray-300 hover:bg-gray-400 py-2 transition duration-300 ease-in-out font-bold text-center'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Facture 19%
                  </Link>
                </div>
              )}
            </nav>

            {/* NAVIGATION BUTTONS */}
            <Link to="/InvoiceList" className="w-full text-black text-sm bg-gray-300 hover:bg-gray-400 py-2 transition duration-300 ease-in-out font-bold text-center">
              Table09%
            </Link>
            <Link to="/InvoiceList2" className="w-full text-black text-sm bg-gray-300 hover:bg-gray-400 py-2 transition duration-300 ease-in-out font-bold text-center">
              Table19%
            </Link>

            {/* BOTTOM SIDE */}
            <div className='w-full  flex-col items-center'>
              {colorTheme === 'light' ?
                <motion.img
                  initial={{
                    scale: 0.6, rotate: 90
                  }}
                  animate={{
                    scale: 1,
                    rotate: 360,
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 15
                  }}
                  onClick={toggleDarkMode}
                  src={moon}
                  className='cursor-pointer ml-8 h-6'
                />
                :
                <motion.img
                  initial={{
                    rotate: 90
                  }}
                  animate={{
                    scale: 1,
                    rotate: 360,
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 15
                  }}
                  onClick={toggleDarkMode}
                  src={sun}
                  className='cursor-pointer ml-8 h-6'
                />
              }
              {/** DOTTED LINE */}
              {/* <div className='h-2 w-10 p-4 w-[100px] border-s'></div>  */}
              <footer className='h-2 text-xs text-center text-gray-500 dark:text-gray-400 mb-4'>
               Khellouf Nahla
            </footer>   
            </div>

            {/* FOOTER NOTE */}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
