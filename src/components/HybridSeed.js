// import React, { useEffect, useState } from 'react';

// function HybridSeed() {
//     const [hybridSeeds, setHybridSeeds] = useState([]);
//     const [filteredHybridSeeds, setFilteredHybridSeeds] = useState([]);
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
//         // Fetch hybrid seeds based on filters
//         let query = '';
//         if (soilType) query += `soilType=${encodeURIComponent(soilType)}&`;
//         if (cropType) query += `cropType=${encodeURIComponent(cropType)}&`;

//         query = query.endsWith('&') ? query.slice(0, -1) : query;

//         fetch(`http://localhost:5002/api/hybrid-seeds?${query}`)
//             .then(response => response.json())
//             .then(data => {
//                 setHybridSeeds(data);
//                 setFilteredHybridSeeds(data); // Initially set to fetched data
//             })
//             .catch(err => {
//                 console.error('Error:', err);
//                 setError('Failed to fetch hybrid seeds');
//             });
//     }, [soilType, cropType]);

//     useEffect(() => {
//         // Apply filter to hybrid seeds
//         const applyFilters = () => {
//             const filtered = hybridSeeds.filter(seed => {
//                 return (!soilType || seed.soilType === soilType) &&
//                     (!cropType || seed.cropType === cropType);
//             });
//             setFilteredHybridSeeds(filtered);
//         };

//         applyFilters();
//     }, [soilType, cropType, hybridSeeds]);

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">Hybrid Seeds</h2>

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

//             {/* Display Hybrid Seeds */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredHybridSeeds.length === 0 ? (
//                     <p>No hybrid seeds found for the selected criteria.</p>
//                 ) : (
//                     filteredHybridSeeds.map((seed, index) => (
//                         <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
//                             <h3 className="text-2xl font-semibold mb-2">{seed.name}</h3>
//                             <p className="mb-4">{seed.description}</p>
//                             <div className="flex flex-col space-y-2">
//                                 <p><strong>Soil Type:</strong> {seed.soilType}</p>
//                                 <p><strong>Crop Type:</strong> {seed.cropType}</p>
//                             </div>
//                             {seed.imageUrl && (
//                                 <div className="mt-4">
//                                     <img src={seed.imageUrl} alt={seed.name} className="w-full h-40 object-cover rounded-md" />
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// export default HybridSeed;
import React, { useEffect, useState } from 'react';

function HybridSeed() {
    const [hybridSeeds, setHybridSeeds] = useState([]);
    const [filteredHybridSeeds, setFilteredHybridSeeds] = useState([]);
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');
    const [soilTypes, setSoilTypes] = useState([]);
    const [cropTypes, setCropTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Mock soil types and crop types
        const mockSoilTypes = [
            { name: 'Clay' },
            { name: 'Sandy' },
            { name: 'Loam' },
            { name: 'Peaty' },
            { name: 'Chalky' },
            { name: 'Silty' },
            { name: 'Gravelly' }
        ];

        const mockCropTypes = [
            { name: 'Wheat' },
            { name: 'Rice' },
            { name: 'Maize' },
            { name: 'Cotton' },
            { name: 'Barley' },
            { name: 'Soybean' },
            { name: 'Sorghum' },
            { name: 'Potato' }
        ];

        setSoilTypes(mockSoilTypes);
        setCropTypes(mockCropTypes);
    }, []);

    useEffect(() => {
        // Mock hybrid seeds data
        const mockHybridSeeds = Array.from({ length: 50 }, (_, index) => ({
            name: `Hybrid Seed ${index + 1}`,
            description: `High-performance hybrid seed suitable for different conditions. Seed number ${index + 1}.`,
            soilType: ['Clay', 'Sandy', 'Loam', 'Peaty', 'Chalky', 'Silty', 'Gravelly'][Math.floor(Math.random() * 7)],
            cropType: ['Wheat', 'Rice', 'Maize', 'Cotton', 'Barley', 'Soybean', 'Sorghum', 'Potato'][Math.floor(Math.random() * 8)],
            imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRBC9ogms2SuhdN3PG2tuLKObRobASuDtpkHawsw_6A43X-qgaqsywxVc92ucA3QbzDDVf1aOfrOF3oJNgg8z4odiutIsSGClaDOcmm9Kg'
        }));

        setHybridSeeds(mockHybridSeeds);
        setFilteredHybridSeeds(mockHybridSeeds); // Set to full data initially
    }, []);

    useEffect(() => {
        // Apply filter to hybrid seeds
        const applyFilters = () => {
            const filtered = hybridSeeds.filter(seed => {
                // Condition 1: Seed matches either soil type or crop type (partial match allowed)
                return (!soilType || seed.soilType === soilType) ||
                    (!cropType || seed.cropType === cropType);
            });

            // Condition 2: If no filtered result matches the selection, return random hybrid seeds
            if (filtered.length === 0) {
                const randomSeeds = hybridSeeds.sort(() => 0.5 - Math.random()).slice(0, 5); // Random 5 seeds
                setFilteredHybridSeeds(randomSeeds);
            } else {
                setFilteredHybridSeeds(filtered);
            }
        };

        applyFilters();
    }, [soilType, cropType, hybridSeeds]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Hybrid Seeds</h2>

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

            {/* Error Handling */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Display Hybrid Seeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHybridSeeds.length === 0 ? (
                    <p>No hybrid seeds found for the selected criteria.</p>
                ) : (
                    filteredHybridSeeds.map((seed, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
                            <h3 className="text-2xl font-semibold mb-2">{seed.name}</h3>
                            <p className="mb-4">{seed.description}</p>
                            <div className="flex flex-col space-y-2">
                                <p><strong>Soil Type:</strong> {seed.soilType}</p>
                                <p><strong>Crop Type:</strong> {seed.cropType}</p>
                            </div>
                            {seed.imageUrl && (
                                <div className="mt-4">
                                    <img src={seed.imageUrl} alt={seed.name} className="w-full h-40 object-cover rounded-md" />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HybridSeed;
