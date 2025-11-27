const { Pool } = require('pg');

const pool = new Pool({
    host: "foodie.chygasw0uo0c.us-east-2.rds.amazonaws.com", 
    port: 5432,
    user: "postgres",
    password: "Buddy2007!",
    database: "foodie",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;