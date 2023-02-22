const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('../connection/connect');
const { viewEmployeeId, viewRoles, viewDepartments } = require('./query');
const employees = [];
const roles = [];
const departments = [];

function Delete(callback) {
    inquirer
        .prompt(questions)
        .then((response) => {

            // --------------------- Delete Employees --------------------- 

            if (response.answer == 'Employee') {
                console.log('Employees')
                db.query(viewEmployeeId, function (err, result) {
                    console.log(result)
                    for (let i = 0; i < result.length; i++) {
                        employees.push({
                            value: result[i].id,
                            name: result[i].Employee
                        });
                    };
                    employees.push({
                        value: null,
                        name: '\x1b[31mGo Back!<<<<<<<\x1b[0m'
                    })
                    inquirer
                        .prompt(empQuestions)
                        .then((response) => {

                            if (response.deleteEmployee == null) {
                                callback('done');
                            } else {
                                db.query('DELETE FROM employee WHERE id = ?', response.deleteEmployee, function (err, result) {
                                    console.log('\x1b[32mSucessfully Deleted Employee!\x1b[0m');
                                    callback('Done');
                                });
                            };
                        });
                });

                // -------------------------------- Delete Roles ---------------------------------

            } else if (response.answer == 'Roles') {
                console.log('Roles')
                db.query(viewRoles, function (err, result) {
                    console.log(result)
                    for (let x = 0; x < result.length; x++) {
                        roles.push({
                            value: result[x].Id,
                            name: result[x].title
                        });
                    };
                    roles.push({
                        value: null,
                        name: '\x1b[31mGo Back!<<<<<<<\x1b[0m'
                    })
                    inquirer
                        .prompt(roleQuestions)
                        .then((response) => {
                            console.log(response)
                            if (response.deleteRole == null) {
                                callback('Done');
                            } else {
                                db.query('DELETE FROM roles WHERE role_id = ?', response.deleteRole, function (err, result) {
                                    console.log('\x1b[32mSucessfully Deleted Role!\x1b[0m');
                                    callback('Done');
                                });
                            };
                        });
                });

// ------------------------------- Delete Departments ----------------------------------

            } else {
                console.log('Departments')
                db.query(viewDepartments, function (err, result) {
                    console.log(result)
                    for (let y = 0; y < result.length; y++) {
                        departments.push({
                            value: result[y].Id,
                            name: result[y].Name
                        });
                    };
                    departments.push({
                        value: null,
                        name: '\x1b[31mGo Back!<<<<<<<\x1b[0m'
                    })
                    inquirer
                        .prompt(depQuestions)
                        .then((response) => {

                            if (response.deleteDepartment == null) {
                                callback('Done');
                            } else {
                                db.query('DELETE FROM department WHERE department_id = ?', response.deleteDepartment, function (err, result) {
                                    console.log('\x1b[32mSucessfully Deleted Department!\x1b[0m');
                                    callback('done');
                                });
                            };
                        });
                });
            };
        });
};

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