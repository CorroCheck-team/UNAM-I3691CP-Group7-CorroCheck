require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

const { analyzeCorrosion } = require('./controllers/corrosionController');

app.post('/analyze-corrosion', analyzeCorrosion);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
