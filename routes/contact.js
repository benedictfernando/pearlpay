const { response } = require('express');
const fetchPerson = require('../services/dbService/fetchPerson');
const upsertPerson = require('../services/dbService/upsertPerson');

const route = require('express').Router();

route

    .get('/new', async (request, response) => {
        response.render('person', {
            id: null,
            firstname: null,
            lastname: null
        })
    })

    .get('/:id',  async (request, response) => {
        const { id } = request.params;
        const data = await fetchPerson(id);
        response.render('person', data);
    })

    .post('/', async (request, response) => {
        const { body } = request;
        await upsertPerson(body);
        response.end();
    })

module.exports = route;