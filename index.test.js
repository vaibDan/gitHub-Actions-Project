const request = require('supertest');
const app = require('./index'); // Import the Express app

describe('API Endpoints', () => {
  const endpoints = [
    {
      path: '/',
      expectedStatus: 200,
      validateResponse: (res) => {
        expect(res.text).toBe('Hello, World!');
      },
    },
    {
      path: '/health',
      expectedStatus: 200,
      validateResponse: (res) => {
        expect(res.body.status).toBe('UP');
      },
    },
    {
      path: '/api/users',
      expectedStatus: 200,
      validateResponse: (res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      },
    },
  ];

  endpoints.forEach(({ path, expectedStatus, validateResponse }) => {
    it(`GET ${path} should return expected response`, async () => {
      const res = await request(app).get(path);
      expect(res.statusCode).toEqual(expectedStatus);
      validateResponse(res);
    });
  });
});
