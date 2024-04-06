const User = require('../models/User');

// Function to get user details by ID
exports.getUserDetails = async (userId) => {
  return await User.findById(userId);
};

// Function to update user details by ID
exports.updateUserDetails = async (userId, updates) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
};
