import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'; // Make sure to install apexcharts and react-apexcharts

const mockSoilTypes = [
    'Loamy Soil',
    'Clay Soil',
    'Sandy Soil',
    'Peaty Soil',
    'Saline Soil',
    'Alkaline Soil'
];

const mockCropTypes = [
    'Wheat',
    'Corn',
    'Rice',
    'Soybean',
    'Barley',
    'Oats'
];

const mockTestResults = {
    'Loamy Soil': {
        'Wheat': { nitrogen: 1.5, phosphorus: 1.2, potassium: 1.0 },
        'Corn': { nitrogen: 2.0, phosphorus: 1.5, potassium: 1.2 }
    },
    'Clay Soil': {
        'Rice': { nitrogen: 1.8, phosphorus: 1.3, potassium: 1.1 },
        'Soybean': { nitrogen: 2.1, phosphorus: 1.4, potassium: 1.3 }
    }
};

function SoilTesting() {
    const [selectedSoilType, setSelectedSoilType] = useState('');
    const [selectedCropType, setSelectedCropType] = useState('');
    const [recommendations, setRecommendations] = useState({});
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            xaxis: {
                categories: [],
            },
            title: {
                text: 'Nutrient Levels',
            },
        }
    });

    useEffect(() => {
        if (selectedSoilType && selectedCropType) {
            const soilData = mockTestResults[selectedSoilType] || {};
            const result = soilData[selectedCropType] || {};
            setRecommendations(result);

            // Prepare data for the chart
            setChartData(prevState => ({
                ...prevState,
                series: [{
                    name: 'Nutrients',
                    data: [result.nitrogen || 0, result.phosphorus || 0, result.potassium || 0]
                }],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: ['Nitrogen', 'Phosphorus', 'Potassium']
                    }
                }
            }));
        }
    }, [selectedSoilType, selectedCropType]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Soil Testing & Recommendations</h2>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg mb-6">Explore detailed soil testing procedures and get personalized recommendations based on your soil and crop type.</p>

                {/* Soil Testing Procedures */}
                <section className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4 text-gray-700">Soil Testing Procedures</h3>
                    <p className="mb-4">Proper soil testing involves a few key steps. Here's a comprehensive guide:</p>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Collect soil samples from multiple locations within your field to get a representative sample.</li>
                        <li>Air-dry the samples on a clean surface, avoiding direct sunlight to prevent contamination.</li>
                        <li>Grind the dried soil to a fine powder and sieve it through a mesh to remove any debris.</li>
                        <li>Mix the soil samples thoroughly and send them to a certified laboratory for analysis.</li>
                        <li>Review the results carefully to understand the nutrient levels and recommendations.</li>
                    </ul>
                    <p className="text-sm italic">For more detailed procedures, visit <a href="https://www.soiltestlab.com" className="text-blue-600 hover:underline">Soil Test Laboratory</a>.</p>
                </section>

                {/* Interactive Tools */}
                <section className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4 text-gray-700">Interactive Tools</h3>
                    <div className="mb-6 flex space-x-4">
                        <div className="flex-1">
                            <label className="block mb-2 text-gray-600">Select Soil Type</label>
                            <select
                                value={selectedSoilType}
                                onChange={(e) => setSelectedSoilType(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Soil Type</option>
                                {mockSoilTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-gray-600">Select Crop Type</label>
                            <select
                                value={selectedCropType}
                                onChange={(e) => setSelectedCropType(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Crop Type</option>
                                {mockCropTypes.map(crop => (
                                    <option key={crop} value={crop}>{crop}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Recommendations */}
                {Object.keys(recommendations).length > 0 && (
                    <section className="mb-8">
                        <h3 className="text-3xl font-semibold mb-4 text-gray-700">Fertilizer Recommendations</h3>
                        <p className="mb-4">Based on the selected soil and crop type, here are the recommended nutrient levels:</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li><strong>Nitrogen:</strong> {recommendations.nitrogen || 'N/A'} g/kg</li>
                            <li><strong>Phosphorus:</strong> {recommendations.phosphorus || 'N/A'} g/kg</li>
                            <li><strong>Potassium:</strong> {recommendations.potassium || 'N/A'} g/kg</li>
                        </ul>
                    </section>
                )}

                {/* Nutrient Levels Chart */}
                <section className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4 text-gray-700">Nutrient Levels Chart</h3>
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={350}
                    />
                </section>

                {/* Resources and Support */}
                <section>
                    <h3 className="text-3xl font-semibold mb-4 text-gray-700">Resources & Support</h3>
                    <p className="mb-4">Find additional resources to help with soil testing and understanding test results:</p>
                    <ul className="list-disc ml-6">
                        <li><a href="https://www.soiltestlab.com" className="text-blue-600 hover:underline">Soil Test Laboratory</a>: Comprehensive soil testing services.</li>
                        <li><a href="https://www.agriculture.gov/soil-testing" className="text-blue-600 hover:underline">Agricultural Soil Testing Guidelines</a>: Official guidelines for soil testing.</li>
                        <li><a href="https://www.fertilizer.org" className="text-blue-600 hover:underline">Fertilizer Recommendations</a>: Information on fertilizer application based on soil and crop types.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default SoilTesting;
