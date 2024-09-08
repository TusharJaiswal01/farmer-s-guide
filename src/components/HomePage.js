import React from 'react';

const HomePage = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">

            <img
                src="Leonardo_Phoenix_a_breathtakingly_surreal_and_vibrant_cinemati_2.jpg"
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                <div className="text-center text-white ">
                    <div className='mb-28'>
                        <h1 className="text-5xl font-bold mb-8">Welcome to Our Platform</h1>
                        <p className="text-2xl">
                            Discover soil types, fertilizers, hybrid seeds, and more to help you make the best decisions for your crops.
                        </p>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-40">
                        <a
                            href="/soil-types"
                            className="bg-yellow-500  px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition transform hover:scale-105 border-4 border-white text-xl"
                        >
                            Soil Types
                        </a>
                        <a
                            href="/fertilizers"
                            className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-300 transition transform hover:scale-105 border-4 border-white text-xl"
                        >
                            Fertilizers
                        </a>
                        <a
                            href="/HybridSeed"
                            className="bg-blue-400 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-300 transition transform hover:scale-105 border-4 border-white text-xl"
                        >
                            Hybrid Seeds
                        </a>
                        <a
                            href="/soil-testing"
                            className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-300 transition transform hover:scale-105 border-4 border-white text-xl"
                        >
                            Soil Testing
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
