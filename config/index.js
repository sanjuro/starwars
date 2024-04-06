module.exports = {
  database: 'mongodb://localhost:27017/starwars_cache', // MongoDB connection URL
  port: 3000, // Port number for the server
  jwtSecret: '123456', // Secret key for JWT token signing
  cacheTime: 30 * 60 * 1000 // Cache time in milliseconds (15 minutes)
};
