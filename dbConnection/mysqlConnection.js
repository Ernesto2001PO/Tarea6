const mysql = require('mysql2/promise');

const dbConnection = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'tito12396',
        database: process.env.MYSQL_DATABASE || 'test',
        port: process.env.DB_PORT || 3306
    });

    return connection;
}



module.exports = dbConnection;