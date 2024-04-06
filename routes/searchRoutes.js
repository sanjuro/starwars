const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const searchController = require('../controllers/searchController');

// Protected route for searching characters
router.get('/', authMiddleware, searchController.searchCharacters);

module.exports = router;
