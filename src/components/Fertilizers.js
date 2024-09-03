import React, { useEffect, useState } from 'react';

function Fertilizers() {
    const [fertilizers, setFertilizers] = useState([]);
    const [filteredFertilizers, setFilteredFertilizers] = useState([]);
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');
    const [soilTypes, setSoilTypes] = useState([]);
    const [cropTypes, setCropTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch soil types and crop types
        Promise.all([
            fetch('http://localhost:5002/api/soil-types').then(res => res.json()),
            fetch('http://localhost:5002/api/crops').then(res => res.json())
        ])
            .then(([soilData, cropData]) => {
                setSoilTypes(soilData);
                setCropTypes(cropData);
            })
            .catch(err => setError('Failed to fetch soil types or crop types'));
    }, []);

    useEffect(() => {
        // Fetch fertilizers based on filters
        let query = '';
        if (soilType) query += `soilType=${encodeURIComponent(soilType)}&`;
        if (cropType) query += `cropType=${encodeURIComponent(cropType)}&`;

        query = query.endsWith('&') ? query.slice(0, -1) : query;

        console.log('Fetching with query:', query); // Debugging line

        fetch(`http://localhost:5002/api/fertilizers?${query}`)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched:', data); // Debugging line
                setFertilizers(data);
                setFilteredFertilizers(data); // Initially set to fetched data
            })
            .catch(err => {
                console.error('Error:', err); // Debugging line
                setError('Failed to fetch fertilizers');
            });
    }, [soilType, cropType]);

    useEffect(() => {
        // Apply filter to fertilizers
        const applyFilters = () => {
            const filtered = fertilizers.filter(fertilizer => {
                return (!soilType || fertilizer.soilType === soilType) &&
                    (!cropType || fertilizer.cropType === cropType);
            });
            console.log('Filtered fertilizers:', filtered); // Debugging line
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

            {/* Error Handling */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

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
