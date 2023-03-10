const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('../connection/connect');
const { viewManagers, viewRoles } = require('./query');
let roles = [];
let managers = [];

function addEmployee(callback) {
    db.query(viewManagers, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            managers.push({
                value: result[i].id,
                name: result[i].Employee
            });
        }
        managers.push(
            {
                value: null,
                name: 'No Manager'
            }
        );
        db.query(viewRoles, function (err, result) {
            for (let x = 0; x < result.length; x++) {
                roles.push({
                    value: result[x].Id,
                    name: result[x].title
                });
            }
            inquirer
                .prompt(questions)
                .then((response) => {
                    let newEmployee = response;
                    db.query('INSERT INTO employee SET ?', newEmployee, function (err, result) {
                        console.log(`${'\u001b[32m'}Successfuly added Employee!${'\u001b[0m'}`);
                        callback('Done');
                    });
                });
        });
    });
}


const questions = [
    {
        type: 'input',
        message: 'Please Enter the Employees First Name? ',
        name: 'first_name'
    },
    {
        type: 'input',
        message: 'Please Enter the Employees Last Name? ',
        name: 'last_name'
    },
    {
        type: 'list',
        message: 'Please Select a Role:',
        name: 'role_id',
        choices: roles
    },
    {
        type: 'list',
        message: 'Please Select a Manager:',
        name: 'manager_id',
        choices: managers
    }
];

module.exports = addEmployee;