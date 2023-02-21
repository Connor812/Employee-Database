const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDepartments } = require('./query')
let department = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db.')
);

function addRole(callback) {
    db.query(viewDepartments, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            department.push({
                value: result[i].Id,
                name: result[i].Name
            });
        }
        inquirer
            .prompt(questions)
            .then((response) => {
                let newRole = response;
                db.query('INSERT INTO roles SET ?', newRole, function (err, result) {
                    console.log(`${'\u001b[32m'}Successfuly added Role!${'\u001b[0m'}`);
                    callback('Done');
                });
            })
    })
}

const questions = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the salary of this roll?',
        name: 'salary'
    },
    {
        type: 'list',
        message: 'What department does this role belong too?',
        name: 'department_id',
        choices: department
    },
    {
        type: 'list',
        message: 'Is this a management position',
        name: 'is_management',
        choices: [
            {
                value: true,
                name: 'Yes'
            },
            {
                value: false,
                name: 'No'
            }
        ]
    }
]

module.exports = addRole;