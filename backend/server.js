// 1. Load your credentials FIRST
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

// 2. Set the port (defaults to 5000 if not found in .env)
const PORT = process.env.PORT || 5000;

app.use(express.json());

// 3. The "Bridge" Route
app.post('/analyze-corrosion', async (req, res) => {
    try {
        console.log("Bridge Received Data!");
        
        // This uses the values from your .env file
        const modelId = process.env.MODEL_ID;
        const apiKey = process.env.API_KEY;

        // This is where we will eventually send the image to Roboflow
        console.log(`Sending to Roboflow Model: ${modelId}`);
        
        res.status(200).json({ message: "Bridge is active and connected to Roboflow!" });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});