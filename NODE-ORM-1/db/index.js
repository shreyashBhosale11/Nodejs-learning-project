


const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
//postgress://<username>:<password>@<host>:<port>/<db_name>
// const pool = new Pool({
//   connectionString: process.env.
// });

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;