const express = require('express');
const https = require('https');

const router = express.Router();
router.use(express.json());

// sample endpoint
router.post('/echo', (request, response) => {
    const message = request.body.message;
    if (message) {
        response.send({ 'message': message });
    } else {
        response.status(400);
        response.send();
    }
});

// sample endpoint
router.get('/cat_fact', async (request, response) => {
    https.get('https://catfact.ninja/fact', cat_fact_response => {
        let body = '';

        cat_fact_response.on('data', function (chunk) {
            body += chunk;
        });

        cat_fact_response.on('end', function () {
            response.send({ 'fact': JSON.parse(body).fact });
        });
    });
})

// respond to invalid api requests with empty 404 response
router.all('*', (request, response) => {
    response.status(404);
    response.send();
});

module.exports = router;
