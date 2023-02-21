const inquirer = require("inquirer");
const mysql = require('mysql2');
const { viewEmployees } = require('./query');
const employees = [];
const roles = [];
const departments = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db.')
);

function Delete(callback) {
    inquirer
        .prompt(questions)
        .then((response) => {
            if (response == 'Employee') {
                console.log('Employees')
                db.query(viewEmployees, function (err, result) {
                    for (let i = 0; i < result.length; i++) {
                        employees.push({
                            value: result[i].Id,
                            name: result[i].Name
                        })
                    }
                })
            } else if (response == 'Roles') {

            } else {

            }
        })
}
const questions = [
    {
        type: 'list',
        message: 'Select which you would liek to delete from?',
        name: 'answer',
        choices: ['Employee', 'Roles', 'Department']
    }
];

const empQuestions = [
    {
        type: 'list',
        message: 'Select a employee you would like delete?',
        name: 'deleteEmployee',
        choices: employees
    }
];

const roleQuestions = [
    {
        type: 'list',
        message: 'Select a role you would like delete?',
        name: 'deleteRole',
        choices: roles
    }
];

const depQuestions = [
    {
        type: 'list',
        message: 'Select a role you would like delete?',
        name: 'deleteDepartment',
        choices: departments
    }
];


module.exports = Delete;