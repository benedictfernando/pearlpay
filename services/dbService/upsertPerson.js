
const db = require('./dbPool');

module.exports = async ({ id, firstname, lastname, emailaddresses, postaladdresses }) => {

    // convert single string to an array of that single string
    if (typeof(emailaddresses) === 'string') { emailaddresses = [emailaddresses] }

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

    // insert person's postal address(es)
    postaladdresses.forEach(async pa => {
        if (!pa.id) {
            sql = `INSERT INTO postaladdresses (street, city, zipcode) VALUES ($1, $2, $3)`;
            await db.query(sql, [pa.street, pa.city, pa.zipcode]);
        } else {
            // update person's existing postal address(es)
            sql = `UPDATE postaladdresses SET street=$2, city=$3, zipcode=$4 WHERE id=$1`;
            await db.query(sql, [pa.id, pa.street, pa.city, pa.zipcode]);
        }
    });
}