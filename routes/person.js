
const route = require('express').Router();

route
    .get('/:firstname/:lastname', (request, response) => {

        // get first name & last name from route paths
        const { firstname, lastname } = request.params;

        // create a json variable containing provided name
        const json = { firstname, lastname };
        response.render('person', json);
    })

    .post('/', (request, response) => {

        // collect data that was submitted by the user
        const { body } = request;
        const { firstname, lastname } = body;

        // send back user the response greeting
        response.send(`Hello ${firstname} ${lastname}`);
    })

module.exports = route;