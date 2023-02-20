const viewEmployees = `SELECT
e1.id,
e1.first_name,
e1.last_name,
roles.title AS title,
department.name AS department,
roles.salary,
CONCAT(e2.first_name, ' ', e2.last_name) AS manager
FROM employee e1
LEFT JOIN employee e2 ON e1.manager_id = e2.id
JOIN roles ON e1.role_id = roles.role_id
JOIN department ON roles.department_id = department.department_id;`;

const viewRoles = `SELECT roles.role_id AS Id, roles.title, department.name AS Department, roles.salary
FROM department
INNER JOIN roles ON department.department_id = roles.department_id;`;

const viewDepartments = `SELECT department_id AS Id, name AS Name FROM department;`

module.exports = {viewEmployees, viewRoles, viewDepartments}