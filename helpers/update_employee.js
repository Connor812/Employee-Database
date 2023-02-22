const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('../connection/connect');
const { viewEmployeesId, viewRoles } = require('./query');
let employees = [];
let roles = [];

function updateEmployee(callback) {
    db.query(viewEmployeesId, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            employees.push({
                value: result[i].id,
                name: result[i].Employee
            })
        }
        db.query(viewRoles, function (err, result) {
            for (let x = 0; x < result.length; x++) {
                roles.push({
                    value: result[x].Id,
                    name: result[x].title
                })
            }
            inquirer
                .prompt(questions)
                .then((response) => {
                    let updateRole = response;
                    db.query(`UPDATE employee SET role_id = ${updateRole.role} WHERE id = ${updateRole.employee}`, updateRole, function (err, result) {
                        console.log(`${'\u001b[32m'}Successfuly added Employee!${'\u001b[0m'}`);
                        callback('Done');
                    });
                });
        });
    });
}
const questions = [
    {
        type: 'list',
        message: 'Which employee role would you like to update?',
        name: 'employee',
        choices: employees
    },
    {
        type: 'list',
        message: 'Select the new role for the employee.',
        name: 'role',
        choices: roles
    }
];

module.exports = updateEmployee;