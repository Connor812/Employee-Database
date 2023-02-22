const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('../connection/connect');
const { viewEmployeeByDepartment, viewEmployeeByDepartment2, viewDepartments } = require('./query');
let departments = [];
let employeesInDepartment;

function viewByDepartment(callback) {
    db.query(viewDepartments, function (err, result) {
        for (let i = 0; i < result.length; i++) {
            departments.push({
                value: result[i].Id,
                name: result[i].Name
            });
        }
        inquirer
            .prompt(questions)
            .then((response) => {
                for (let x = 0; x < departments.length; x++) {
                    if (response.department == departments[x].value) {
                        employeesInDepartment = departments[x].name;
                        break;
                    }
                }
                console.log(employeesInDepartment)
                db.query(viewEmployeeByDepartment + employeesInDepartment + viewEmployeeByDepartment2, response.department, function (err, result) {
                    console.table(result);
                    callback('Done');
                });
            });
    });
};

const questions = [
    {
        type: 'list',
        message: 'Select a \x1b[31mdepartment\x1b[0m to see their employees?',
        name: 'department',
        choices: departments
    }
];

module.exports = viewByDepartment;