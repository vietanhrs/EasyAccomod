'use strict';

const express = require('express');
const request = require('supertest');
const { body } = require('express-validator');
const validate = require('../app/middleware/validate');

function makeApp(rules) {
    const app = express();
    app.use(express.json());
    app.post('/test', rules, validate, (req, res) => res.status(200).json({ ok: true }));
    return app;
}

describe('validate middleware', () => {
    it('passes when all validation rules succeed', async () => {
        const app = makeApp([body('name').notEmpty()]);
        const res = await request(app).post('/test').send({ name: 'hello' });
        expect(res.status).toBe(200);
    });

    it('returns 422 with errors array when validation fails', async () => {
        const app = makeApp([body('name').notEmpty().withMessage('name required')]);
        const res = await request(app).post('/test').send({});
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0]).toHaveProperty('msg', 'name required');
    });

    it('returns all errors when multiple fields fail', async () => {
        const app = makeApp([
            body('a').notEmpty().withMessage('a required'),
            body('b').isInt().withMessage('b must be int'),
        ]);
        const res = await request(app).post('/test').send({});
        expect(res.status).toBe(422);
        expect(res.body.errors.length).toBeGreaterThanOrEqual(2);
    });
});
