
const db = require('./dbPool');

module.exports = async ({ id, firstname, lastname }) => {

    // initialize variable for later manipulation
    const toInsert = !id; var sql;
        
    // insert person for new submissions
    if(toInsert) {
        sql = `INSERT INTO people (firstname, lastname) VALUES ($1, $2)`
        await db.query(sql, [firstname, lastname]); return;
    }

    // else, update existing data
    sql = `UPDATE people SET firstname=$1, lastname=$2 WHERE id=$3`;
    await db.query(sql, [firstname, lastname, id]);
}