const mongoose = require('mongoose');
const config = require('../config/index');

const searchResultSchema = new mongoose.Schema({
  searchQuery: { type: String, required: true, unique: true },
  result: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now, expires: config.cacheTime / 1000 } // Automatically expire documents after cacheTime
});

module.exports = mongoose.model('SearchResult', searchResultSchema);
