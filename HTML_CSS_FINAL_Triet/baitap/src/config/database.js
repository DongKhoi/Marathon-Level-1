import mysql from 'mysql2/promise'
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'thnode',
    password: '',
});
export default connection;