const axios = require('axios');

const analyzeCorrosion = async (req, res) => {
    try {
        const imageFile = req.body.image; // Assuming the app sends the image
        const url = `https://detect.roboflow.com/${process.env.ROBOFLOW_MODEL_ID}?api_key=${process.env.ROBOFLOW_API_KEY}`;
        
        const response = await axios.post(url, imageFile);
        
        // This extracts the severity class!
        const result = {
            severity: response.data.predictions[0].class,
            confidence: response.data.predictions[0].confidence
        };
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("AI Analysis failed");
    }
};

module.exports = { analyzeCorrosion };