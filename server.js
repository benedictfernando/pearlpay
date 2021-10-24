
// import express component
const express = require('express');
const fetchPeople = require('./services/dbService/fetchPeople');

// create server using express component
const server = express();

// handle server-side codes
server

    // use the 'public' folder to serve other static files
    .use(express.static('public'))

    // set ejs files as views for the user
    .set('view engine', 'ejs')

    // route to its respective references
    .use('/', require('./routes/name'))
    .use('/hello', require('./routes/hello'))
    .use('/person', require('./routes/person'))
    .use('/contacts', require('./routes/contacts'))

    // prompt user when port 3000 is visited
    .listen(3000, () => {
        console.log('server is now running...');
    });