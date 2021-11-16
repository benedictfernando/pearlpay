// import postgres component
const { Pool } = require('pg');

// create a new Pool object database
const db = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    password: process.env.DBPASS,
    port: process.env.DBPORT,
});

// make db available to any file in the web-app
module.exports = db;