const User = require('../models/User');

// Function to get user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
