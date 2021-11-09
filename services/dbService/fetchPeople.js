
const db = require('./dbPool');

module.exports = async () => {

    // create sql query
    const query = await db.query(
        'SELECT p_id id, firstname, lastname FROM people'
    );

    // returns resulting rows
    return query.rows;
}