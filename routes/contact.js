const { response } = require('express');
const cryptService = require('../services/cryptService');
const fetchPerson = require('../services/dbService/fetchPerson');
const upsertPerson = require('../services/dbService/upsertPerson');
const deletePerson = require('../services/dbService/deletePerson');

const route = require('express').Router();

route

    .get('/new', async (request, response) => {
        response.render('person', {
            id: null,
            firstname: null,
            lastname: null,
            emailaddresses: null
        })
    })

    .get('/:id',  async (request, response) => {
        let { id } = request.params;
        id = cryptService.decrypt(id);
        const data = await fetchPerson(id);
        response.render('person', data);
    })

    .post('/', async (request, response) => {
        const { body } = request;
        await upsertPerson(body);
        response.end();
    })

    .delete('/:id', async (request, response) => {
        const { id } = request.params;
        await deletePerson(id);
        response.sendStatus(204);
    });

module.exports = route;