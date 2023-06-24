import apiRouter from '../src/api.js';
import assert from 'assert';
import DatabaseConnectionPool from '../src/databaseConnectionPool.js';
import express from 'express';
import request from 'supertest';
import { before, beforeEach, describe, it } from 'node:test';

describe('sectors', async () => {
    let app;
    before(() => {
        app = express();
        app.use(apiRouter);
    });
    beforeEach(async () => {
        let pool = new DatabaseConnectionPool();
        await pool.resetData();
        await pool.addSector({ 'name': 'X1' });
        await pool.addSector({ 'name': 'X2' });
        await pool.addRack({ 'capacity': 5, 'occupied': 2, 'sectorId': 1 });
        await pool.addRack({ 'capacity': 7, 'occupied': 3, 'sectorId': 1 });
        // TODO: add slots
    });

    it('get all successfully', async () => {
        let sectors = (await request(app)
            .get('/sectors')
            .expect(200)).body;
        assert.equal(sectors.length, 2);
        assert.deepStrictEqual(sectors.find(s => s.ID == 1), {
            'ID': 1,
            'name': 'X1',
            'racks': [1, 2],
        });
        assert.deepStrictEqual(sectors.find(s => s.ID == 2), {
            'ID': 2,
            'name': 'X2',
            'racks': [],
        });
    });
    it('get by id successfully', async () => {
        const sectorX1 = (await request(app)
            .get('/sectors/1')
            .expect(200)).body;
        assert.deepStrictEqual(sectorX1, [
            {
                'rackID': 1,
                'capacity': 5,
                'slots': [],
            },
            {
                'rackID': 2,
                'capacity': 7,
                'slots': [],
            },
        ]);

        const sectorX2 = (await request(app)
            .get('/sectors/2')
            .expect(200)).body;
        assert.deepStrictEqual(sectorX2, []);
    });
    it('post successfully', async () => {
        await request(app)
            .post('/sectors')
            .send({ 'name': 'A1' })
            .expect(200);
        await request(app)
            .post('/sectors')
            .send({ 'name': 'A2' })
            .expect(200);
        await request(app)
            .post('/sectors')
            .send({})
            .expect(200);

        let sectors = (await request(app)
            .get('/sectors')
            .expect(200)).body;
        assert.equal(sectors.length, 5);
        assert.deepStrictEqual(sectors.find(s => s.ID == 3), {
            'ID': 3,
            'name': 'A1',
            'racks': [],
        });
        assert.deepStrictEqual(sectors.find(s => s.ID == 4), {
            'ID': 4,
            'name': 'A2',
            'racks': [],
        });
        assert.deepStrictEqual(sectors.find(s => s.ID == 5), {
            'ID': 5,
            'name': null,
            'racks': [],
        });
    });
    it('delete successfully', async () => {
        await request(app)
            .delete('/sectors/2')
            .send()
            .expect(200);
        let sectors = (await request(app)
            .get('/sectors')
            .expect(200)).body;
        assert.equal(sectors.length, 1);
        assert.equal(sectors[0].name, 'X1');
    });
    it('delete with rack foreign key violation', async () => {
        await request(app)
            .delete('/sectors/1')
            .send()
            .expect(400);
        const sectors = (await request(app)
            .get('/sectors')
            .expect(200)).body;
        assert.equal(sectors.length, 2);
    });
});