
const route = require('express').Router();

route
    .get('/', (request, response) => {
        response.send({ message1: 'hello', message2: 'world' });
    })

module.exports = route;