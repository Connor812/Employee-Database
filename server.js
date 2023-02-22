const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { viewEmployees, viewRoles, viewDepartments } = require('./helpers/query');
let validateEmployee;
let validateRole;
let validateDepartment;

// ------- Grabbing all helper functions -------

const addEmployee = require('./helpers/add_employee');
const addRole = require('./helpers/add_role');
const addDepartment = require('./helpers/add_department');
const updateEmployee = require('./helpers/update_employee');
const updateManager = require('./helpers/update_manager');
const viewByManager = require('./helpers/view_by_manager');
const viewByDepartment = require('./helpers/view_by_department');
const Delete = require('./helpers/delete');
const viewDepartmentTotalSalary = require('./helpers/view_total_salary');
const { response } = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db.')
);


console.log(`+----------------------------------------------------------+`);
console.log(`|                                                          |`);
console.log(`|     _____                 _                              |`);
console.log(`|    |  ___|_ __ ___  _ __ | | ___  _   _  ____  ____      |`);
console.log("|    |  _| | '_ ' _ \\| '_ \\| |/ _ \\| | | |/  _ \\/  _ \\     |");
console.log(`|    |  |__| | | | | | |_) | | (_| | |_| |   __/   __/     |`);
console.log(`|    |_____|_| |_| |_| .__/|_|\\___/\\___, |\\____|\\____|     |`);
console.log(`|                    |_|            |___/                  |`);
console.log(`|     __  __                                               |`);
console.log(`|    |  \\/  | ___ _ _ __   ___ _  ___ _  ____ _ __         |`);
console.log(`|    | |\\/| |/ _ ' | '_ \\ / _ ' |/ _ ' |/  _ \\ '__|        |`);
console.log(`|    | |  | | (_|  | | | | (_|  | (_|  |  ___/  |          |`);
console.log(`|    |_|  |_|\\___,_|_| |_|\\___,_|\\___, |\\____|__|          |`);
console.log(`|                                |____/                    |`);
console.log(`|                                                          |`);
console.log(`+----------------------------------------------------------+`);


const questions = [
    {
        type: 'list',
        message: 'Please select what you would like to do? ',
        name: 'answer',
        choices: ['\x1b[100mView All Employees\x1b[0m',
            'Add Employee',
            '\x1b[100mUpdate Employee Role\x1b[0m',
            'Update Employee Manager',
            '\x1b[100mView Employees by Manager\x1b[0m',
            'View All Roles',
            '\x1b[100mAdd Role\x1b[0m',
            'View All Departments',
            '\x1b[100mView Employees By Department\x1b[0m',
            'View Department Total Budget',
            '\x1b[100mAdd Department\x1b[0m',
            'Delete From Database',
            '\x1b[41mQuit\x1b[0m']
    }];

async function validate(arg1, arg2, arg3) {

    arg1 = await db.promise().query('SELECT id, LENGTH(id) FROM employee;')
        .then((response) => {
            if (response.length > 0) {
                validateEmployee = true;
            } else {
                validateEmployee = false;
            }
            return validateEmployee;
        })

    arg2 = await db.promise().query('SELECT role_id, LENGTH(role_id) FROM roles;')
    .then((response) => {
    if (response.length > 0) {
            validateRole = true;
        } else {
            validateRole = false;
        }
        return validateRole;
    })
    arg3 = await db.promise().query('SELECT department_id, LENGTH(department_id) FROM department;')
    .then((response) => {
    if (response.length > 0) {
            validateDepartment = true;
        } else {
            validateDepartment = false;
        }
        return validateDepartment;
    })

    // ----------- Validates that information is in the tables ------------

    if (validateEmployee && validateRole && validateDepartment) {
        askAgain.repeat();
    } else {
        console.log('ERROR: No employee DATA in the employee_db!');
    }
}

validate() 

class Repeat {
    constructor() {
    }
    repeat() {

        inquirer
            .prompt(questions)
            .then((response) => {
                const answer = response.answer
                console.log(answer)
                if (answer !== 'Quit') {
                    if (answer == '\x1b[100mView All Employees\x1b[0m') {
                        console.log('works')
                        db.query(viewEmployees, function (err, result) {
                            console.log('');
                            console.table(result);
                            askAgain.repeat();
                        })
                    } else if (answer == 'Add Employee') {
                        addEmployee(function (arg1) {
                            askAgain.repeat();
                        });
                    } else if (answer == '\x1b[100mUpdate Employee Role\x1b[0m') {
                        updateEmployee(function (arg1) {
                            askAgain.repeat();
                        })
                    } else if (answer == 'Update Employee Manager') {
                        updateManager(function (arg1) {
                            askAgain.repeat();
                        })
                    } else if (answer == '\x1b[100mView Employees by Manager\x1b[0m') {
                        viewByManager(function (arg1) {
                            askAgain.repeat();
                        })
                    } else if (answer == 'View All Roles') {
                        db.query(viewRoles, function (err, result) {
                            console.log('');
                            console.table(result);
                            askAgain.repeat();
                        })
                    } else if (answer == '\x1b[100mAdd Role\x1b[0m') {
                        addRole(function (arg1) {
                            askAgain.repeat();
                        })
                    }
                    else if (answer == 'View All Departments') {
                        db.query(viewDepartments, function (err, result) {
                            console.log('');
                            console.table(result);
                            askAgain.repeat();
                        })
                    } else if (answer == '\x1b[100mView Employees By Department\x1b[0m') {
                        viewByDepartment(function (arg1) {
                            askAgain.repeat();
                        })
                    } else if (answer == 'View Department Total Budget') {
                        viewDepartmentTotalSalary(function (arg1) {
                            askAgain.repeat();
                        })
                    } else if (answer == '\x1b[100mAdd Department\x1b[0m') {
                        addDepartment(function (arg1) {
                            askAgain.repeat();
                        })
                    } else if (answer == 'Delete From Database') {
                        Delete(function (arg1) {
                            askAgain.repeat();
                        })
                    }
                } else {
                    console.log('Thank you for using Employee Manager!');
                };
            });
    };
};

const askAgain = new Repeat();

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);