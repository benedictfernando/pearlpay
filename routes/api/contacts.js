const fetchPeople = require('../../services/dbService/fetchPeople');
const cryptService = require('../../services/cryptService');

const route = require('express').Router();

route
    .get('/', async (request, response) => {
        const contacts = await fetchPeople();
        contacts.forEach(contact => {
            contact.id = cryptService.encrypt(contact.id);
        }); response.send({ contacts });
    });

module.exports = route;