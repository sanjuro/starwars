const axios = require('axios');
const SearchResult = require('../models/SearchResult');

// Function to search for Star Wars characters
exports.searchCharacters = async (query) => {
  const cachedResult = await SearchResult.findOne({ searchQuery: query });
  if (cachedResult && Date.now() - cachedResult.createdAt.getTime() < config.cacheTime) {
    return cachedResult.result;
  }
  const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
  const data = response.data;
  await SearchResult.findOneAndUpdate(
    { searchQuery: query },
    { result: data, createdAt: Date.now() },
    { upsert: true }
  );
  return data;
};
