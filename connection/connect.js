const mysql = require('mysql2');

const db = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',  // <-------------- Please Change Password Before Running Program
        database: 'employee_db'
    },
    console.log('Connected to the employee_db.')
);


module.exports = db; 