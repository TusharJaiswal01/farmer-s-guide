const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/soil-and-fertilizer', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// Schema Definitions
const soilTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    pH: String,
    bestCrops: [String],
    nutrientContent: {
        nitrogen: String,
        phosphorus: String,
        potassium: String,
    },
    fertilizationGuidelines: String,
    irrigationTips: String,
    erosionControl: String,
    region: String,
    climate: String,
    imageUrl: String,
});

const fertilizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true },
    soilType: { type: String },  // Add soilType field
    cropType: { type: String },  // Add cropType field
});

const cropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    soilType: { type: String, required: true },
});

// Add HybridSeed Schema
const hybridSeedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    soilType: { type: String, required: true },
    cropType: { type: String, required: true },
    imageUrl: String,
});

const SoilType = mongoose.model('SoilType', soilTypeSchema);
const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);
const Crop = mongoose.model('Crop', cropSchema);
// Add HybridSeed Model
const HybridSeed = mongoose.model('HybridSeed', hybridSeedSchema);

// Routes for fetching data
app.get('/api/soil-types', async (req, res) => {
    try {
        const soilTypes = await SoilType.find();
        console.log('Soil types fetched:', soilTypes); // Debugging line
        res.json(soilTypes);
    } catch (error) {
        console.error('Error fetching soil types:', error.message); // Debugging line
        res.status(500).json({ message: 'Error fetching soil types', error: error.message });
    }
});

app.get('/api/fertilizers', async (req, res) => {
    const { soilType, cropType } = req.query;

    try {
        const query = {};

        if (soilType) {
            query.soilType = { $regex: new RegExp(soilType, 'i') }; // Case-insensitive
        }
        if (cropType) {
            query.cropType = { $regex: new RegExp(cropType, 'i') }; // Case-insensitive
        }

        const fertilizers = await Fertilizer.find(query);

        res.json(fertilizers);
    } catch (error) {
        console.error('Error fetching fertilizers:', error);
        res.status(500).json({ error: 'Failed to fetch fertilizers' });
    }
});

app.get('/api/crops', async (req, res) => {
    const { soilType } = req.query;

    try {
        const query = soilType ? { soilType } : {};
        const crops = await Crop.find(query);
        console.log('Crops fetched:', crops); // Debugging line
        res.json(crops);
    } catch (error) {
        console.error('Error fetching crops:', error.message); // Debugging line
        res.status(500).json({ message: 'Error fetching crops', error: error.message });
    }
});

// Add Route for Hybrid Seeds
app.get('/api/hybrid-seeds', async (req, res) => {
    const { soilType, cropType } = req.query;

    try {
        const query = {};

        if (soilType) {
            query.soilType = { $regex: new RegExp(soilType, 'i') }; // Case-insensitive
        }
        if (cropType) {
            query.cropType = { $regex: new RegExp(cropType, 'i') }; // Case-insensitive
        }

        const hybridSeeds = await HybridSeed.find(query);
        console.log('Hybrid seeds fetched:', hybridSeeds); // Debugging line
        res.json(hybridSeeds);
    } catch (error) {
        console.error('Error fetching hybrid seeds:', error.message); // Debugging line
        res.status(500).json({ message: 'Error fetching hybrid seeds', error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
