import React, { useState } from 'react';

export default function Navbar() {
  // State to toggle the hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => setIsOpen(!isOpen);

  // Array of nav items with their corresponding paths
  const navItems = [
    { name: 'Home', path: 'https://farm-tech-support.vercel.app/' },
    { name: 'Disease Detection & Farm Intrusion', path: 'https://crop-disease-detection-and-farm-itrusion.vercel.app/' },

    { name: 'Farmer\'s Guide', path: 'https://farmer-s-guide.vercel.app/' },
    { name: 'Community', path: 'https://farmer-eight.vercel.app/' },

  ];

  return (
    <nav className="bg-[#479d4f] dark:bg-gray-900 fixed w-full h-16 z-10 top-0 start-0 dark:border-gray-600 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {/* Logo and Hamburger Button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="http://localhost:3011" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="logo2.png" className="h-12 w-24 md:h-14 md:w-28" alt="logo" />
            <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </a>
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center p-2 ml-3 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        <div className={`hidden md:flex md:w-auto md:order-1 mt-0 ${isOpen ? "block" : "hidden"}`} id="navbar-sticky">
          <ul className="flex flex-col p-0 md:p-0 mt-0 font-medium bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={`fixed inset-0 z-20 flex flex-col items-center justify-start bg-[#479d4f] dark:bg-gray-900 md:hidden ${isOpen ? "block" : "hidden"}`}>
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 text-white"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="flex flex-col space-y-4 p-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 font-bold"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
