'use strict';

const request = require('supertest');
const bcrypt = require('bcryptjs');

// Mock the entire db module before requiring the app
jest.mock('../app/models', () => ({
    accounts: { findAll: jest.fn() },
    users: {},
    posts: {},
    rooms: {},
    comments: {},
    userFavorites: {},
    reportedPosts: {},
    notifications: {},
    extendRequests: {},
    postCost: {},
    sequelize: { query: jest.fn() },
    Sequelize: {},
}));

const db = require('../app/models');
const app = require('../server');

const HASHED_PASSWORD = bcrypt.hashSync('password123', 10);

describe('POST /api/accounts/login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns 202 and sets cookie on valid credentials', async () => {
        db.accounts.findAll.mockResolvedValue([{
            dataValues: {
                username: 'testuser',
                accountType: 'Renter',
                password: HASHED_PASSWORD,
                verified: true,
            }
        }]);

        const res = await request(app)
            .post('/api/accounts/login')
            .send({ username: 'testuser', password: 'password123' });

        expect(res.status).toBe(202);
        expect(res.body).toHaveProperty('username', 'testuser');
        expect(res.body).not.toHaveProperty('token');
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('returns 401 when account is not verified', async () => {
        db.accounts.findAll.mockResolvedValue([{
            dataValues: {
                username: 'pending',
                accountType: 'Landlord',
                password: HASHED_PASSWORD,
                verified: false,
            }
        }]);

        const res = await request(app)
            .post('/api/accounts/login')
            .send({ username: 'pending', password: 'password123' });

        expect(res.status).toBe(401);
    });

    it('returns 401 on wrong password', async () => {
        db.accounts.findAll.mockResolvedValue([{
            dataValues: {
                username: 'testuser',
                accountType: 'Renter',
                password: HASHED_PASSWORD,
                verified: true,
            }
        }]);

        const res = await request(app)
            .post('/api/accounts/login')
            .send({ username: 'testuser', password: 'wrongpass' });

        expect(res.status).toBe(401);
    });

    it('returns 400 when account does not exist', async () => {
        db.accounts.findAll.mockResolvedValue([]);

        const res = await request(app)
            .post('/api/accounts/login')
            .send({ username: 'nobody', password: 'password123' });

        expect(res.status).toBe(400);
    });

    it('returns 422 when username is missing', async () => {
        const res = await request(app)
            .post('/api/accounts/login')
            .send({ password: 'password123' });

        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('errors');
    });

    it('returns 422 when password is missing', async () => {
        const res = await request(app)
            .post('/api/accounts/login')
            .send({ username: 'testuser' });

        expect(res.status).toBe(422);
    });
});

describe('POST /api/accounts/logout', () => {
    it('returns 200 and clears the token cookie', async () => {
        const res = await request(app).post('/api/accounts/logout');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Logged out successfully');
    });
});
