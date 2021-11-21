
const dbPool = require('./dbPool');

const { v4: uuid } = require("uuid");

module.exports = async ({ id, firstname, lastname, emailaddresses, postaladdresses }) => {

    // throw new Error('database error');

    // initialize an empty database
    let db = null;

    try {
        // start database connection
        db = await dbPool.connect();
    
        // begin transaction
        await db.query('BEGIN');

        // convert single string to an array of that single string
        if (typeof(emailaddresses) === 'string') { emailaddresses = [emailaddresses] }

        var sql; // initialize variable for later manipulation
            
        if(!id) {
            // create a new uuid
            id = uuid();

            // insert person for new submissions
            sql = `INSERT INTO people (firstname, lastname, emailaddresses, p_id) VALUES ($1, $2, $3, $4)`
            await db.query(sql, [firstname, lastname, emailaddresses, id]);
        } else {
            // else, update existing data
            sql = `UPDATE people SET firstname=$1, lastname=$2, emailaddresses=$4 WHERE p_id=$3`;
            await db.query(sql, [firstname, lastname, id, emailaddresses]);
        }

        // insert person's postal address(es)
        postaladdresses?.forEach(async pa => {
            if (!pa.id) {
                // create a new uuid
                pa.id = uuid();

                sql = `INSERT INTO postaladdresses (street, city, zipcode, p_id, pa_id) VALUES ($1, $2, $3, $4, $5)`;
                await db.query(sql, [pa.street, pa.city, pa.zipcode, id, pa.id]);
            } else {
                // update person's existing postal address(es)
                sql = `UPDATE postaladdresses SET street=$2, city=$3, zipcode=$4, p_id=$5 WHERE pa_id=$1`;
                await db.query(sql, [pa.id, pa.street, pa.city, pa.zipcode, id]);
            }
        });

        // delete person's postaladdress(es)
        const pa_ids = postaladdresses?.filter(i => !!i.id).map(i => `'${i.id}'`).join(',') || [];
        if (pa_ids.length > 0) {
            await db.query(`DELETE FROM postaladdresses
                WHERE p_id=$1 AND pa_id NOT IN (${pa_ids})`, [id]);
        } else { await db.query(`DELETE FROM postaladdresses WHERE p_id=$1`, [id]); }

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