
const route = require('express').Router();

route
    .get('/', (request, response) => {

        // get first name & last name from query string
        const { firstname, lastname } = request.query;

        // send back json response to requesting client
        response.send({ firstname, lastname });
    })

module.exports = route;