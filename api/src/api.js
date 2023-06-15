const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/rack', (request, response) => {
    // TODO: replace sample data with database fetch
    response.send({
        'sectors': [
            {
                'id': 1,
                'racks': [
                    { 'id': 1 },
                    { 'id': 2 },
                ]
            },
            {
                'id': 2,
                'racks': [
                    { 'id': 3 },
                ]
            }
        ]
    });
});

router.get('/rack/:id', (request, response) => {
    // TODO: replace sample data with database fetch
    let response_body;
    if (request.params.id >= 1 && request.params.id <= 3) {
        response_body = {
            'rack': [
                {
                    'height': 1,
                    'width': 2,
                    'slots': [
                        {
                            'name': 'Rubber duck',
                            'placement': {
                                'height': 0,
                                'width': 0,
                            },
                            'reserved': true,
                            'arriveDate': '2023-09-01',
                            'expiryDate': null,
                        },
                        {
                            'name': 'Purple cheese',
                            'placement': {
                                'height': 0,
                                'width': 1
                            },
                            'reserved': false,
                            'arriveDate': null,
                            'expiryDate': '2023-07-22',
                        },
                    ]
                }
            ]
        };
    }

    if (response_body) {
        response.send(response_body);
    }
    else {
        response.status(404);
        response.send({ 'error': 'Could not find rack matching provided id.' });
    }
})

// respond to invalid api requests with empty 404 response
router.all('*', (request, response) => {
    response.status(404);
    response.send();
});

module.exports = router;
