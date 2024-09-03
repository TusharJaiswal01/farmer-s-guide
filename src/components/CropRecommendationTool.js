import React, { useState } from 'react';

function CropRecommendationTool({ soilTypes }) {
    const [selectedSoil, setSelectedSoil] = useState('');
    const [recommendedCrops, setRecommendedCrops] = useState([]);

    const handleSoilSelection = (e) => {
        const soil = soilTypes.find(soilType => soilType.name === e.target.value);
        setSelectedSoil(soil.name);
        setRecommendedCrops(soil.bestCrops);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Crop Recommendation Tool</h2>
            <select onChange={handleSoilSelection} className="p-2 border rounded">
                <option value="">Select Soil Type</option>
                {soilTypes.map((soilType, index) => (
                    <option key={index} value={soilType.name}>{soilType.name}</option>
                ))}
            </select>
            {recommendedCrops.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Recommended Crops:</h3>
                    <ul className="list-disc list-inside">
                        {recommendedCrops.map((crop, index) => (
                            <li key={index}>{crop}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CropRecommendationTool;
