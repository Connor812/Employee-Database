const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('../connection/connect');

const questions = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
    }
];

function addDepartment(callback) {
    inquirer
        .prompt(questions)
        .then((response) => {
            let newDepartment = response;
            db.query('INSERT INTO department SET ?', newDepartment, function (err, result) {
                console.log(`${'\u001b[32m'}Successfuly added Department!${'\u001b[0m'}`);
                callback('Done');
            });
        });
};

module.exports = addDepartment;