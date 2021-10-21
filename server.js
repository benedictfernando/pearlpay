
// import express
const express = require('express');

// create server using express component
const server = express();

// handle server-side codes
server

     // execute when home route is visited
    .get('/', (request, response) => {

        // get first name & last name from query string
        const { firstname, lastname } = request.query;

        // send back json response to requesting client
        response.send({ firstname, lastname });
    })

    // execute when /hello route is visited
    .get('/hello', (request, response) => {
        response.send({ message1: 'hello', message2: 'world' });
    })

    // execute when /person route is visited
    .get('/person/:firstname/:lastname', (request, response) => {

        // get first name & last name from route paths
        const { firstname, lastname } = request.params;

        // send back json response to requesting client
        response.send({ firstname, lastname });
    })

    // prompt user when port 3000 is visited
    .listen(3000, () => {
        console.log('server is now running...');
    });