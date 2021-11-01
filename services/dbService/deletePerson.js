
const db = require('./dbPool');

module.exports = async (id) => {

    // create sql query
    const query = await db.query(
        'DELETE FROM people WHERE id=$1', [id]
    );

    // returns results
    return query;
}