
const route = require('express').Router();

route
    .get('/:firstname/:lastname', (request, response) => {

        // get first name & last name from route paths
        const { firstname, lastname } = request.params;

        // create a json variable containing provided name
        const json = { firstname, lastname };
        response.render('person', json);
    })

module.exports = route;