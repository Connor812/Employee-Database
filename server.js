const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { viewEmployees, viewRoles, viewDepartments } = require('./helpers/query');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
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
        choices: ['View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit']
    }];



function repeat() {
    inquirer
        .prompt(questions)
        .then((response) => {
            const answer = response.answer
            if (answer == 'View All Employees') {
                db.query(viewEmployees, function (err, result) {
                    console.table(result)
                    repeat();
                })
            } else if (answer == 'Add Employee') {
                        
            } else if (answer == 'View All Roles') {
                db.query(viewRoles, function (err, result) {
                    console.table(result)
                    repeat();
                })

            } else if (answer == 'View All Departments') {
                db.query(viewDepartments, function (err, result) {
                    console.table(result)
                    repeat();
                })

            } else if (answer == 'Quit') {
                console.log('Thank you for using Employee Manager!')
                return;
            }
        }); 
}

repeat();



app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);