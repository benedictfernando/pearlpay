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

// make db available to any file in the web-app
module.exports = db;