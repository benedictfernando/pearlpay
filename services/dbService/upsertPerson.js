
const db = require('./dbPool');

module.exports = async ({ id, firstname, lastname, emailaddresses }) => {

    // initialize variable for later manipulation
    const toInsert = !id; var sql;
        
    // insert person for new submissions
    if(toInsert) {
        sql = `INSERT INTO people (firstname, lastname, emailaddresses) VALUES ($1, $2, $3)`
        await db.query(sql, [firstname, lastname, emailaddresses]); return;
    }

    // else, update existing data
    sql = `UPDATE people SET firstname=$1, lastname=$2, emailaddresses=$4 WHERE id=$3`;
    await db.query(sql, [firstname, lastname, id, emailaddresses]);
}