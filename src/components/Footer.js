import React from 'react';

function Footer() {
    return (
        <footer className="bg-green-700 p-8 text-white mt-6">
            <div className="container mx-auto text-center">
                {/* Warning Section */}
                <div className="bg-yellow-400 text-red-700 p-4 mb-4 rounded-md">
                    <p className="font-bold">
                        Disclaimer: The information and data on this website are for demonstration purposes only.
                        Please do not use this data for real farming decisions.
                    </p>
                </div>

                {/* Copyright Section */}
                <p className="text-sm md:text-lg">&copy; 2024 Farmer's Guide. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
