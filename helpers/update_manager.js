const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('../connection/connect');
const { viewEmployeesId, viewManagers } = require('./query');
let employees = [];
let managers = [];

function updateManager(callback) {
    db.query(viewEmployeesId, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            employees.push({
                value: result[i].id,
                name: result[i].Employee
            })
        }
        db.query(viewManagers, function (err, result) {
            for (let x = 0; x < result.length; x++) {
                managers.push({
                    value: result[x].id,
                    name: result[x].Employee
                })
            }
            inquirer
                .prompt(questions)
                .then((response) => {
                    let updateManager = response;
                    db.query(`UPDATE employee SET manager_id = ${updateManager.managerId} WHERE id = ${updateManager.employee}`, function (err, result) {
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
        message: 'Which \x1b[31memployee manager\x1b[0m would you like to update?',
        name: 'employee',
        choices: employees
    },
    {
        type: 'list',
        message: 'Select the \x1b[31mnew manager\x1b[0m for the employee.',
        name: 'managerId',
        choices: managers
    }
];

module.exports = updateManager;