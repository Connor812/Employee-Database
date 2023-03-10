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
JOIN department ON roles.department_id = department.department_id
ORDER BY id;`;

const viewEmployeeId = `SELECT id, CONCAT(first_name, ' ', last_name) AS Employee FROM employee`

const viewRoles = `SELECT roles.role_id AS Id, roles.title, department.name AS Department, roles.salary
FROM department
INNER JOIN roles ON department.department_id = roles.department_id
ORDER BY role_id;`;

const viewDepartments = `SELECT department_id AS Id, name AS Name FROM department;`

const viewManagers = `SELECT concat(employee.first_name, ' ', employee.last_name) AS Employee, employee.id, roles.role_id
FROM roles
INNER JOIN employee ON employee.role_id = roles.role_id
WHERE is_management = 1;`;

const viewEmployeesId = `SELECT id, concat(first_name, ' ', last_name) AS Employee
FROM employee`;

const viewManagersNoRoles = `SELECT concat(employee.first_name, ' ', employee.last_name) AS Employee, employee.id
FROM roles
INNER JOIN employee ON employee.role_id = roles.role_id
WHERE is_management = 1;`;

const viewEmployeeByDepartment = `SELECT CONCAT(first_name, ' ', last_name) AS 'Employees in `

const viewEmployeeByDepartment2 = `' , roles.title, department.name
FROM department
INNER JOIN roles ON roles.department_id = department.department_id
INNER JOIN employee ON employee.role_id = roles.role_id
WHERE department.department_id = ?;`

const viewTotalSalary = `SELECT roles.salary, department.name
FROM department
INNER JOIN roles ON roles.department_id = department.department_id
WHERE roles.department_id = ?`;

module.exports = {
    viewEmployees,
    viewRoles,
    viewDepartments,
    viewManagers,
    viewEmployeesId,
    viewManagersNoRoles,
    viewEmployeeByDepartment,
    viewEmployeeByDepartment2,
    viewEmployeeId,
    viewTotalSalary
}