// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Correct import

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-green-700 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Farmer's Guide</h1>

                {/* Hamburger Icon for Small Screens */}
                <button
                    onClick={toggleMenu}
                    className="block md:hidden p-2 focus:outline-none"
                >
                    {isMenuOpen ? (
                        <XMarkIcon className="h-6 w-6 text-white" />
                    ) : (
                        <Bars3Icon className="h-6 w-6 text-white" />
                    )}
                </button>

                {/* Navigation Links */}
                <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <Link to="/" className="block mt-2 md:mt-0 hover:text-yellow-300">Home</Link>
                    <Link to="/soil-types" className="block mt-2 md:mt-0 hover:text-yellow-300">Soil Types</Link>
                    <Link to="/fertilizers" className="block mt-2 md:mt-0 hover:text-yellow-300">Fertilizers</Link>
                    <Link to="/HybridSeed" className="block mt-2 md:mt-0 hover:text-yellow-300">HybridSeed</Link>
                    <Link to="/soil-testing" className="block mt-2 md:mt-0 hover:text-yellow-300">Soil Testing</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
