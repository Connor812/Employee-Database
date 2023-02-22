const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('../connection/connect');
const { viewTotalSalary, viewDepartments } = require('./query');
let roleSalarys = [];

function viewDepartmentTotalSalary(callback) {
    let total = 0;
    db.query(viewDepartments, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            roleSalarys.push({
                value: result[i].Id,
                name: result[i].Name
            });
        }
        inquirer
            .prompt(questions)
            .then((response) => {
                db.query(viewTotalSalary, response.salary, function (err, result) {
                    for (let x = 0; x < result.length; x++) {
                        total = total + parseInt(result[x].salary);
                    };
                    let totalSalary = `\x1b[32m${result[0].name} total budget: \x1b[33m$${total}\x1b[0m`;
                    console.log(`
+-----------------------------------------+
|                                         |
|${totalSalary}              |
|                                         |
+-----------------------------------------+    `);

                    callback('Done');
                });
            });
    });
};

const questions = [
    {
        type: 'list',
        message: 'Select a \x1b[31mdepartment\x1b[0m to see its total budget?',
        name: 'salary',
        choices: roleSalarys
    }
];

module.exports = viewDepartmentTotalSalary;