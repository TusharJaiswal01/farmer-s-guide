// import React, { useEffect, useState } from 'react';

// function Fertilizers() {
//     const [fertilizers, setFertilizers] = useState([]);
//     const [filteredFertilizers, setFilteredFertilizers] = useState([]);
//     const [soilType, setSoilType] = useState('');
//     const [cropType, setCropType] = useState('');
//     const [soilTypes, setSoilTypes] = useState([]);
//     const [cropTypes, setCropTypes] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Fetch soil types and crop types
//         Promise.all([
//             fetch('http://localhost:5002/api/soil-types').then(res => res.json()),
//             fetch('http://localhost:5002/api/crops').then(res => res.json())
//         ])
//             .then(([soilData, cropData]) => {
//                 setSoilTypes(soilData);
//                 setCropTypes(cropData);
//             })
//             .catch(err => setError('Failed to fetch soil types or crop types'));
//     }, []);

//     useEffect(() => {
//         // Fetch fertilizers based on filters
//         let query = '';
//         if (soilType) query += `soilType=${encodeURIComponent(soilType)}&`;
//         if (cropType) query += `cropType=${encodeURIComponent(cropType)}&`;

//         query = query.endsWith('&') ? query.slice(0, -1) : query;

//         console.log('Fetching with query:', query); // Debugging line

//         fetch(`http://localhost:5002/api/fertilizers?${query}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Data fetched:', data); // Debugging line
//                 setFertilizers(data);
//                 setFilteredFertilizers(data); // Initially set to fetched data
//             })
//             .catch(err => {
//                 console.error('Error:', err); // Debugging line
//                 setError('Failed to fetch fertilizers');
//             });
//     }, [soilType, cropType]);

//     useEffect(() => {
//         // Apply filter to fertilizers
//         const applyFilters = () => {
//             const filtered = fertilizers.filter(fertilizer => {
//                 return (!soilType || fertilizer.soilType === soilType) &&
//                     (!cropType || fertilizer.cropType === cropType);
//             });
//             console.log('Filtered fertilizers:', filtered); // Debugging line
//             setFilteredFertilizers(filtered);
//         };

//         applyFilters();
//     }, [soilType, cropType, fertilizers]);

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">Fertilizers</h2>

//             {/* Filters */}
//             <div className="mb-6 flex space-x-4">
//                 <div>
//                     <label className="block mb-2">Filter by Soil Type</label>
//                     <select
//                         value={soilType}
//                         onChange={(e) => setSoilType(e.target.value)}
//                         className="p-2 border rounded"
//                     >
//                         <option value="">All</option>
//                         {soilTypes.map(type => (
//                             <option key={type.name} value={type.name}>{type.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block mb-2">Filter by Crop Type</label>
//                     <select
//                         value={cropType}
//                         onChange={(e) => setCropType(e.target.value)}
//                         className="p-2 border rounded"
//                     >
//                         <option value="">All</option>
//                         {cropTypes.map(crop => (
//                             <option key={crop.name} value={crop.name}>{crop.name}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Error Handling */}
//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             {/* Display Fertilizers */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredFertilizers.length === 0 ? (
//                     <p>No fertilizers found for the selected criteria.</p>
//                 ) : (
//                     filteredFertilizers.map((fertilizer, index) => (
//                         <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
//                             <h3 className="text-2xl font-semibold mb-2">{fertilizer.name}</h3>
//                             <p className="mb-4">{fertilizer.description}</p>
//                             <div className="flex flex-col space-y-2">
//                                 <p><strong>Nitrogen:</strong> {fertilizer.nitrogen}%</p>
//                                 <p><strong>Phosphorus:</strong> {fertilizer.phosphorus}%</p>
//                                 <p><strong>Potassium:</strong> {fertilizer.potassium}%</p>
//                             </div>
//                             {fertilizer.imageUrl && (
//                                 <div className="mt-4">
//                                     <img src={fertilizer.imageUrl} alt={fertilizer.name} className="w-full h-40 object-cover rounded-md" />
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Fertilizers;

import React, { useState, useEffect } from 'react';

// Mock soil types
const mockSoilTypes = [
    { name: 'Loamy' },
    { name: 'Clayey' },
    { name: 'Sandy' },
    { name: 'Peaty' },
    { name: 'Chalky' },
    { name: 'Silty' },
];

// Mock crop types
const mockCropTypes = [
    { name: 'Wheat' },
    { name: 'Rice' },
    { name: 'Maize' },
    { name: 'Barley' },
    { name: 'Soybean' },
    { name: 'Potato' },
    { name: 'Tomato' },
    { name: 'Cotton' },
];

// Mock fertilizers
const mockFertilizers = [
    {
        name: 'Fertilizer A',
        description: 'A balanced fertilizer for all soil types.',
        nitrogen: 20,
        phosphorus: 10,
        potassium: 15,
        soilType: 'Loamy',
        cropType: 'Wheat',
        imageUrl: 'https://media.istockphoto.com/id/1265209398/photo/feeding-lawn-with-granular-fertilizer-for-perfect-green-grass.jpg?s=612x612&w=0&k=20&c=mWbKeDsSXqnwV_UObpgy-y3sVIXkj133wuTqbrHvxS0='
    },
    {
        name: 'Fertilizer B',
        description: 'Ideal for sandy soil and rice crops.',
        nitrogen: 15,
        phosphorus: 5,
        potassium: 10,
        soilType: 'Sandy',
        cropType: 'Rice',
        imageUrl: 'https://media.istockphoto.com/id/136349695/photo/bagged-fertilizer.jpg?s=612x612&w=0&k=20&c=khUx5GLShkBiourmuORq0VXLVBAPUHqyu_IzQr0RvKw='
    },
    {
        name: 'Fertilizer C',
        description: 'Best suited for clayey soil and maize crops.',
        nitrogen: 25,
        phosphorus: 15,
        potassium: 20,
        soilType: 'Clayey',
        cropType: 'Maize',
        imageUrl: 'https://media.istockphoto.com/id/684977254/photo/farmer-hand-giving-plant-organic-humus-fertilizer-to-plant.jpg?s=612x612&w=0&k=20&c=SjD1diUDXEBmXRF1My6lDdwV9BGpPTD1yWUCwz8235U='
    },
    {
        name: 'Fertilizer D',
        description: 'Great for peaty soils and barley crops.',
        nitrogen: 18,
        phosphorus: 8,
        potassium: 12,
        soilType: 'Peaty',
        cropType: 'Barley',
        imageUrl: 'https://media.istockphoto.com/id/136349695/photo/bagged-fertilizer.jpg?s=612x612&w=0&k=20&c=khUx5GLShkBiourmuORq0VXLVBAPUHqyu_IzQr0RvKw='
    },
    {
        name: 'Fertilizer E',
        description: 'Suitable for chalky soil and soybean crops.',
        nitrogen: 22,
        phosphorus: 12,
        potassium: 18,
        soilType: 'Chalky',
        cropType: 'Soybean',
        imageUrl: 'https://media.istockphoto.com/id/1214600608/photo/indian-farmer-is-applying-fertilizer-in-steel-vessel-to-increase-fertilizer-capacity-wheat.jpg?s=612x612&w=0&k=20&c=QgToPwAzDIGzd_pUfh_LrGlI25ikfbPVvwi220zXfis='
    },
    {
        name: 'Fertilizer F',
        description: 'Perfect for silty soils and potato crops.',
        nitrogen: 30,
        phosphorus: 20,
        potassium: 25,
        soilType: 'Silty',
        cropType: 'Potato',
        imageUrl: 'https://media.istockphoto.com/id/148130431/photo/fertilizing-lawn.jpg?s=612x612&w=0&k=20&c=12i6b2dLjCvU7HkFdefkw3oPN2zMcmadrU5VZ7kY304='
    },
    {
        name: 'Fertilizer G',
        description: 'Specially designed for tomatoes on loamy soil.',
        nitrogen: 28,
        phosphorus: 18,
        potassium: 22,
        soilType: 'Loamy',
        cropType: 'Tomato',
        imageUrl: 'https://media.istockphoto.com/id/1328836451/photo/opened-plastic-bag-with-green-complex-fertiliser-granules-on-dark-soil-background-closeup.jpg?s=612x612&w=0&k=20&c=igUvKeBPND1RKHx6uLMCQZAF48QU038nZbCbzJ7pBRo='
    },
    {
        name: 'Fertilizer H',
        description: 'Excellent for cotton crops on sandy soils.',
        nitrogen: 26,
        phosphorus: 16,
        potassium: 20,
        soilType: 'Sandy',
        cropType: 'Cotton',
        imageUrl: 'https://media.istockphoto.com/id/959697442/photo/farmer-giving-granulated-fertilizer-to-young-tomato-plants.jpg?s=612x612&w=0&k=20&c=4sewLXboXwTJY9kAXcyjw0GAwN33XzEGVjln597d_aE='
    },
    {
        name: 'Fertilizer I',
        description: 'Best suited for wheat on clayey soils.',
        nitrogen: 20,
        phosphorus: 12,
        potassium: 18,
        soilType: 'Clayey',
        cropType: 'Wheat',
        imageUrl: 'https://media.istockphoto.com/id/93478217/photo/yellow-gloved-hand-holding-a-green-scoop-with-fertilizer.jpg?s=612x612&w=0&k=20&c=WOX42URHKKmEktnlfdDbBRCzK80_f79xbjv_t7xF4Oo='
    },
    {
        name: 'Fertilizer J',
        description: 'Perfect for rice crops on silty soils.',
        nitrogen: 24,
        phosphorus: 14,
        potassium: 19,
        soilType: 'Silty',
        cropType: 'Rice',
        imageUrl: 'https://media.istockphoto.com/id/1265209398/photo/feeding-lawn-with-granular-fertilizer-for-perfect-green-grass.jpg?s=612x612&w=0&k=20&c=mWbKeDsSXqnwV_UObpgy-y3sVIXkj133wuTqbrHvxS0='
    },
];

function Fertilizers() {
    const [fertilizers, setFertilizers] = useState(mockFertilizers);
    const [filteredFertilizers, setFilteredFertilizers] = useState(mockFertilizers);
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');
    const [soilTypes, setSoilTypes] = useState(mockSoilTypes);
    const [cropTypes, setCropTypes] = useState(mockCropTypes);

    // Apply filters when soilType or cropType changes
    useEffect(() => {
        const applyFilters = () => {
            const filtered = fertilizers.filter(fertilizer => {
                return (!soilType || fertilizer.soilType === soilType) &&
                    (!cropType || fertilizer.cropType === cropType);
            });
            setFilteredFertilizers(filtered);
        };

        applyFilters();
    }, [soilType, cropType, fertilizers]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Fertilizers</h2>

            {/* Filters */}
            <div className="mb-6 flex space-x-4">
                <div>
                    <label className="block mb-2">Filter by Soil Type</label>
                    <select
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">All</option>
                        {soilTypes.map(type => (
                            <option key={type.name} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Filter by Crop Type</label>
                    <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">All</option>
                        {cropTypes.map(crop => (
                            <option key={crop.name} value={crop.name}>{crop.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Display Fertilizers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFertilizers.length === 0 ? (
                    <p>No fertilizers found for the selected criteria.</p>
                ) : (
                    filteredFertilizers.map((fertilizer, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
                            <h3 className="text-2xl font-semibold mb-2">{fertilizer.name}</h3>
                            <p className="mb-4">{fertilizer.description}</p>
                            <div className="flex flex-col space-y-2">
                                <p><strong>Nitrogen:</strong> {fertilizer.nitrogen}%</p>
                                <p><strong>Phosphorus:</strong> {fertilizer.phosphorus}%</p>
                                <p><strong>Potassium:</strong> {fertilizer.potassium}%</p>
                            </div>
                            {fertilizer.imageUrl && (
                                <div className="mt-4">
                                    <img src={fertilizer.imageUrl} alt={fertilizer.name} className="w-full h-40 object-cover rounded-md" />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Fertilizers;
