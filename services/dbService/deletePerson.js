
const dbPool = require('./dbPool');

module.exports = async (id) => {

    try {
        // start database connection
        var db = await dbPool.connect();

        // begin transaction
        await db.query('BEGIN');

        // delete relative data across tables
        await db.query('DELETE FROM people WHERE p_id=$1', [id]);
        await db.query('DELETE FROM postaladdresses WHERE p_id=$1', [id]);

        // commit all if successful
        await db.query('COMMIT');
    }
    
    catch (err) {
        // else, print error then rollback
        console.log(err); await db.query('ROLLBACK');
    }
    
    finally {
        // release database connection
        db?.release();
    }
}