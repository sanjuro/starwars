const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Initialize MongoDB memory server for testing
const mongod = new MongoMemoryServer();

// Establish connection to the MongoDB memory server
module.exports.setupTestDB = async () => {
  const uri = await mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

// Close the MongoDB memory server and mongoose connection after all tests
module.exports.closeTestDB = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};
