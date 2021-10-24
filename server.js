
// import express
const express = require('express');

// create server using express component
const server = express();

// handle server-side codes
server

    // use the 'public' folder to serve other static files
    .use(express.static('public'))

    // set ejs files as views for the user
    .set('view engine', 'ejs')

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

        // create a json variable containing provided name
        const json = { firstname, lastname };

        // send back json response to requesting client
        response.render('home', json);
    })

    // prompt user when port 3000 is visited
    .listen(3000, () => {
        console.log('server is now running...');
    });