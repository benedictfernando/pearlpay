
const dbPool = require('./dbPool');

module.exports = async ({ id, firstname, lastname, emailaddresses, postaladdresses }) => {

    // initialize an empty database
    let db = null;

    try {
        // start database connection
        db = await dbPool.connect();
    
        // begin transaction
        await db.query('BEGIN');

        // convert single string to an array of that single string
        if (typeof(emailaddresses) === 'string') { emailaddresses = [emailaddresses] }

        // initialize variable for later manipulation
        const toInsert = !id; var sql;
            
        if(toInsert) {
            // insert person for new submissions
            sql = `INSERT INTO people (firstname, lastname, emailaddresses) VALUES ($1, $2, $3)`
            await db.query(sql, [firstname, lastname, emailaddresses]);
        } else {
            // else, update existing data
            sql = `UPDATE people SET firstname=$1, lastname=$2, emailaddresses=$4 WHERE id=$3`;
            await db.query(sql, [firstname, lastname, id, emailaddresses]);
        }

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

        // push all changes to database if all commits have been successful
        await db.query('COMMIT');
    } 
    catch (err) {
        // rollback to previous database state otherwise
        await db.query('ROLLBACK');

        // handle error message...
        console.log(err);
    } 
    finally {
        // release database connection
        if (db) { db.release(); }
    }
}