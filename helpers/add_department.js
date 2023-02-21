const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDepartments } = require('./query')
let department = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db.')
);

const questions = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
    }
];