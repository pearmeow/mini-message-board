const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
    connectrionString: process.env.DB_URL,
});
