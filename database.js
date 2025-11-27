const { Pool } = require('pg');

const pool = new Pool({
    host: "foodie.chygasw0uo0c.us-east-2.rds.amazonaws.com",      // or server IP
    port: 5432,             // PostgreSQL default port
    user: "postgres",       // your db user
    password: "Buddy2007!",
    database: "Foodie"
});

module.exports = pool;