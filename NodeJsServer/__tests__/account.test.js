'use strict';

const request = require('supertest');

jest.mock('../app/models', () => ({
    accounts: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
    users: {
        findAll: jest.fn(),
        create: jest.fn(),
    },
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

describe('POST /api/accounts (create)', () => {
    beforeEach(() => jest.clearAllMocks());

    it('returns 422 when required fields are missing', async () => {
        const res = await request(app)
            .post('/api/accounts')
            .send({ username: 'ab', password: 'short' });

        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('errors');
    });

    it('returns 422 when username is too short', async () => {
        const res = await request(app)
            .post('/api/accounts')
            .send({
                username: 'ab',
                password: 'password123',
                accountType: 'Renter',
                idCard: '123456789',
                email: 'test@test.com',
                phoneNumber: '0123456789',
            });

        expect(res.status).toBe(422);
        expect(res.body.errors.some(e => e.path === 'username')).toBe(true);
    });

    it('returns 422 when accountType is invalid', async () => {
        const res = await request(app)
            .post('/api/accounts')
            .send({
                username: 'validuser',
                password: 'password123',
                accountType: 'Admin',
                idCard: '123456789',
                email: 'test@test.com',
                phoneNumber: '0123456789',
            });

        expect(res.status).toBe(422);
        expect(res.body.errors.some(e => e.path === 'accountType')).toBe(true);
    });

    it('returns 422 when email is invalid', async () => {
        const res = await request(app)
            .post('/api/accounts')
            .send({
                username: 'validuser',
                password: 'password123',
                accountType: 'Renter',
                idCard: '123456789',
                email: 'not-an-email',
                phoneNumber: '0123456789',
            });

        expect(res.status).toBe(422);
        expect(res.body.errors.some(e => e.path === 'email')).toBe(true);
    });

    it('returns 406 when user already exists', async () => {
        db.users.findAll.mockResolvedValue([{ idCard: '123' }]);

        const res = await request(app)
            .post('/api/accounts')
            .send({
                username: 'validuser',
                password: 'password123',
                accountType: 'Renter',
                idCard: '123456789',
                email: 'test@test.com',
                phoneNumber: '0123456789',
            });

        expect(res.status).toBe(406);
    });

    it('returns 201 on successful account creation', async () => {
        db.users.findAll.mockResolvedValue([]);
        db.users.create.mockResolvedValue({});
        db.accounts.create.mockResolvedValue({});

        const res = await request(app)
            .post('/api/accounts')
            .send({
                username: 'newuser',
                password: 'password123',
                accountType: 'Renter',
                idCard: '987654321',
                email: 'new@test.com',
                phoneNumber: '0987654321',
                firstName: 'Nguyen',
                lastName: 'Van A',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Signup successfully');
    });
});

describe('GET /api/accounts', () => {
    it('returns 200 with all accounts', async () => {
        db.accounts.findAll.mockResolvedValue([
            { username: 'user1', accountType: 'Renter' },
            { username: 'user2', accountType: 'Landlord' },
        ]);

        const res = await request(app).get('/api/accounts');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(2);
    });
});

describe('GET /', () => {
    it('returns server running message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Server is running');
    });
});
