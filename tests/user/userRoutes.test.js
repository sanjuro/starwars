const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');

// Mock user data for testing
const userData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: 'password123'
};

// JWT token for authenticated requests
let token;

// Clear the User collection in the database before each test
beforeEach(async () => {
  await User.deleteMany();
});

// Register a user and get JWT token before running tests
beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send(userData);
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('token');
  token = res.body.token;
});

describe('User Routes', () => {
  // Test getting user details
  describe('GET /api/user/details', () => {
    it('should get user details', async () => {
      const res = await request(app)
        .get('/api/user/details')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('email', userData.email);
    });

    it('should return 401 if token is missing', async () => {
      const res = await request(app)
        .get('/api/user/details');
      expect(res.statusCode).toEqual(401);
    });
  });

  // Test updating user details
  describe('PUT /api/user/update', () => {
    it('should update user details', async () => {
      const updates = { firstName: 'Updated', lastName: 'User' };
      const res = await request(app)
        .put('/api/user/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updates);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('firstName', updates.firstName);
      expect(res.body).toHaveProperty('lastName', updates.lastName);
    });

    it('should return 401 if token is missing', async () => {
      const res = await request(app)
        .put('/api/user/update')
        .send({ firstName: 'Updated', lastName: 'User' });
      expect(res.statusCode).toEqual(401);
    });
  });
});
