
const db = require('./dbPool');

module.exports = async (id) => {

    // create sql query
    const query = await db.query(
        'SELECT id, firstname, lastname, emailaddresses FROM people WHERE id=$1', [id]
    );

    // returns resulting rows
    return query.rows[0];
}