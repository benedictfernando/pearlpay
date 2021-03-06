
// require environmental variables configurations
require('dotenv').config();

// import express component
const express = require('express');

// include services
const cryptService = require('./services/cryptService');
const fetchPeople = require('./services/dbService/fetchPeople');

// create server using express component
const server = express();

// handle server-side codes
server

    // set ejs files as views for the user
    .set('view engine', 'ejs')

    // use the 'public' folder to serve other static files
    .use(express.static('public'))

    // configure server to now receive requests of json data
    .use(express.json())

    // configure server to now receive submitted form data
    .use(express.urlencoded({ extended: true }))

    // route to its respective references
    // .use('/', require('./routes/name'))
    // .use('/hello', require('./routes/hello'))
    // .use('/person', require('./routes/person'))
    // .use('/contact', require('./routes/contact'))
    // .use('/contacts', require('./routes/contacts'))

    // prompt user when port 3001 is visited
    .listen(3001, () => {
        console.log('server is now running...');
    });

// add route services functionality
require('./services/routeService')(server);

// include cryptService to local functions
server.locals.functions = {
    encrypt: val => {
        return cryptService.encrypt(val);
    }
}