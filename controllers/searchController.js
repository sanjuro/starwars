const axios = require('axios');
const SearchResult = require('../models/SearchResult');
const config = require('../config');

// Function to search for Star Wars characters
exports.searchCharacters = async (req, res) => {
  try {
    const { query } = req.query;

    const cachedResult = await SearchResult.findOne({ searchQuery: query });
    if (cachedResult && Date.now() - cachedResult.createdAt.getTime() < config.cacheTime) {
      return res.json(cachedResult.result);
    }

    const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
    const data = response.data;

    await SearchResult.findOneAndUpdate(
      { searchQuery: query },
      { result: data, createdAt: Date.now() },
      { upsert: true }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
