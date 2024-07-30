const {Pool} = require('pg');
require('dotenv').config();

module.exports = new Pool({
    connectionString: `postgresql://${process.env.ROLE}:${process.env.ROLE_PWD}@${process.env.HOST}/${process.env.DB_NAME}`,
});