
// import express component
const express = require('express');

// create server using express component
const server = express();

// import postgres component
const { Pool } = require('pg');

// create a new Pool object database
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: 'contacts',
    password: 'benedict',
    port: '9999',
});

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

    // execute when /contacts route is visited
    .get('/contacts', async (request, response) => {
        
        // create sql query
        const query = await db.query(
            'SELECT * FROM people'
        );

        // store resulting rows into a variable
        const contacts = query.rows;
        response.render('home', { contacts });
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
        response.render('home', json);
    })

    // prompt user when port 3000 is visited
    .listen(3000, () => {
        console.log('server is now running...');
    });