const DatabaseConnectionPool = require('./databaseConnectionPool.js');
const express = require('express');

const router = express.Router();
router.use(express.json());

const pool = new DatabaseConnectionPool();

router.get('/racks', async (request, response) => {
    response.send(await pool.getRacks());
});

router.get('/racks/:id', async (request, response) => {
    const rack = await pool.getRack(request.params.id);
    if (!rack) {
        response.status(404);
        response.send({ 'error': 'Could not find rack matching provided id.' });
        return;
    }

    response.send(rack);
})

router.post('/racks', async (request, response) => {
    if (!await pool.addRack(request.body)) {
        response.status(400);
    }
    response.send();
});

router.delete('/racks/:id', async (request, response) => {
    if (!await pool.removeRack(request.params.id)) {
        response.status(204);
    }
    response.send();
});

// respond to invalid api requests with empty 404 response
router.all('*', (request, response) => {
    response.status(404);
    response.send();
});

module.exports = router;
