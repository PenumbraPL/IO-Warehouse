const DatabaseConnectionPool = require('./databaseConnectionPool.js');
const express = require('express');

const router = express.Router();
router.use(express.json());

const pool = new DatabaseConnectionPool();
pool.connect();

router.get('/racks', async (request, response) => {
    const queryResult = await pool.getRacks();
    response.send(queryResult.rows);
});

router.get('/racks/:id', async (request, response) => {
    const queryResult = await pool.getRack(request.params.id);
    if (queryResult.rowCount == 0) {
        response.status(404);
        response.send({ 'error': 'Could not find rack matching provided id.' });
        return;
    }

    response.send(queryResult.rows[0]);
})

// respond to invalid api requests with empty 404 response
router.all('*', (request, response) => {
    response.status(404);
    response.send();
});

module.exports = router;
