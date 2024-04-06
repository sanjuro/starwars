const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../../services/authService');
const User = require('../../models/User');
const config = require('../../config');

// Mock user data for testing
const userData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: 'password123'
};

describe('Authentication Service', () => {
  describe('Signup', () => {
    it('should register a new user', async () => {
      // Spy on bcrypt.hash to mock its behavior
      jest.spyOn(bcrypt, 'hash').mockReturnValue('hashedPassword');

      // Mock the save method of the User model
      const saveMock = jest.fn();
      jest.spyOn(User.prototype, 'save').mockImplementation(saveMock);

      await authService.signup(userData.firstName, userData.lastName, userData.email, userData.password);

      // Verify that bcrypt.hash was called with the correct password
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);

      // Verify that the User model's save method was called with the correct user data
      expect(saveMock).toHaveBeenCalledWith();

      // Restore the original implementations after the test
      bcrypt.hash.mockRestore();
      User.prototype.save.mockRestore();
    });
  });

  describe('Login', () => {
    it('should authenticate and generate JWT token', async () => {
      // Mock the findOne method of the User model
      const findOneMock = jest.fn().mockReturnValue(userData);
      jest.spyOn(User, 'findOne').mockImplementation(findOneMock);

      // Spy on bcrypt.compare to mock its behavior
      jest.spyOn(bcrypt, 'compare').mockReturnValue(true);

      // Spy on jwt.sign to mock its behavior
      jest.spyOn(jwt, 'sign').mockReturnValue('mockedToken');

      const token = await authService.login(userData.email, userData.password);

      // Verify that the User model's findOne method was called with the correct email
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });

      // Verify that bcrypt.compare was called with the correct password
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, userData.password);

      // Verify that jwt.sign was called with the correct parameters
      expect(jwt.sign).toHaveBeenCalledWith({ userId: userData._id }, config.jwtSecret, { expiresIn: '1h' });

      // Verify that the generated token is returned
      expect(token).toEqual('mockedToken');

      // Restore the original implementations after the test
      User.findOne.mockRestore();
      bcrypt.compare.mockRestore();
      jwt.sign.mockRestore();
    });
  });
});
