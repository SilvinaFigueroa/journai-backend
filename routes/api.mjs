import express from 'express'
import dotenv from 'dotenv'

// Express Router
const router = express.Router()

dotenv.config()

const apiKey = process.env.VITE_WEATHER_KEY;
const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';


// Route to handle weather api requests 
router.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get(`${weatherApiUrl}?key=${apiKey}&q=${city}&aqi=no`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

export default router