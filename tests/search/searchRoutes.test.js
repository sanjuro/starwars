const request = require('supertest');
const app = require('../../server');
const SearchResult = require('../../models/SearchResult');

// Mock search result data for testing
const searchResultData = {
  searchQuery: 'luke',
  result: {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77'
  }
};

// JWT token for authenticated requests
let token;

// Clear the SearchResult collection in the database before each test
beforeEach(async () => {
  await SearchResult.deleteMany();
});

// Cache search result before running tests
beforeAll(async () => {
  await SearchResult.create(searchResultData);
});

describe('Search Routes', () => {
  // Test searching for Star Wars characters
  describe('GET /api/search', () => {
    it('should search for Star Wars characters', async () => {
      const res = await request(app)
        .get('/api/search')
        .query({ query: 'luke' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('results');
      expect(res.body.results.length).toBeGreaterThan(0);
      expect(res.body.results[0]).toHaveProperty('name', searchResultData.result.name);
    });
  });
});
