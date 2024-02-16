const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/fetch-games', async (req, res) => {
    const url = "http://localhost:8000/recommend/";
    
    // Formatting the genres array to the desired string format
    const genreString = `[${req.body.genres.map(genre => `'${genre}'`).join(', ')}]`;

    console.log(genreString);
    const params = {
        genre: genreString
    };

    console.log('Request to Django with params:', params); // Logging the request

    try {
        const response = await axios.get(url, { params });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching game recommendations');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});