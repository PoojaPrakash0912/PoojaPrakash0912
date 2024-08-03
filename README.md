import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import { Request, Response } from 'express';

const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/stockdata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Stock Schema and Model
const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

const Stock = mongoose.model('Stock', stockSchema);

// Polling function
const fetchStockData = async () => {
  const stocks = ['GOOG', 'BTC', 'AAPL', 'TSLA', 'ETH'];
  for (const symbol of stocks) {
    try {
      const response = await axios.get(`https://api.example.com/data?symbol=${symbol}`);
      const price = response.data.price;
      await Stock.create({ symbol, price });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};

setInterval(fetchStockData, 5000);

// Endpoint to get latest data for a specific symbol
app.get('/api/stocks/:symbol', async (req: Request, res: Response) => {
  const symbol = req.params.symbol;
  const data = await Stock.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



<!---
PoojaPrakash0912/PoojaPrakash0912 is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
