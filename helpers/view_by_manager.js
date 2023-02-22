const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('../connection/connect');
const cTable = require('console.table');
const { viewManagersNoRoles } = require('./query');
let managers = [];
let employeeUnder;

function viewByManager(callback) {
    db.query(viewManagersNoRoles, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            managers.push({
                value: result[i].id,
                name: result[i].Employee
            });
        }
        inquirer
            .prompt(questions)
            .then((response) => {
                for (let x = 0; x < managers.length; x++) {
                    if (response.manager == managers[x].value) {
                        employeeUnder = managers[x].name;
                        break;
                    }
                }
                db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'Employee Under ${employeeUnder}' FROM employee WHERE manager_id = ${response.manager};`, function (err, result) {
                    console.table(result);
                    callback('Done');
                });
            });
    });
};

const questions = [
    {
        type: 'list',
        message: 'Select a \x1b[31mmanager\x1b[0m to see their employees?',
        name: 'manager',
        choices: managers
    }
];

module.exports = viewByManager;