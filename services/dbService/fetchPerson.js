
const db = require('./dbPool');

module.exports = async (id) => {

    // create sql query
    const query = await db.query(
        `SELECT p.id, p.firstname, p.lastname, p.emailaddresses,
        json_agg(
            json_build_object(
                'id', pa.id,
                'street', pa.street,
                'city', pa.city,
                'zipcode', pa.zipcode
            )
        ) postaladdresses
        FROM people p JOIN postaladdresses pa ON p.id = pa.p_id 
        WHERE p.id=$1 GROUP BY p.id, p.firstname, p.lastname, p.emailaddresses`, [id]
    );

    // returns resulting rows
    return query.rows[0];
}