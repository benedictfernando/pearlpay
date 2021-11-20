const fetchPeople = require('../../services/dbService/fetchPeople');

const route = require('express').Router();

route
    .get('/', async (request, response) => {
        
        const contacts = await fetchPeople();
        response.send({ contacts });
    })

module.exports = route;