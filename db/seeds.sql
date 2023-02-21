INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');
       

INSERT INTO roles (title, salary, department_id, is_management)
VALUES ('Sales Lead', 100000, 1, true),
       ('Sales Person', 80000, 1, false),
       ('Lead Engineer', 150000, 2, true),
       ('Software Engineer', 120000, 2, false),
       ('Account Manager', 160000, 3, true),
       ('Accountant', 125000, 3, false),
       ('Legal Team Lead', 250000, 4, true),
       ('Lawyer', 190000, 4, false);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Connor', 'Savoy', 1, NULL),
       ('Heckor', 'Rain', 1, NULL),
       ('Zeke', 'Francia', 2, 1),
       ('Steve', 'Cardie', 2, 1),
       ('James', 'Lawson', 2, 1),
       ('Nick', 'Doe', 3, NULL),
       ('John', 'Johnson', 4, 5),
       ('Cam', 'Johnson', 4, 5),
       ('Ben', 'Ward', 4, 5),
       ('Jamie', 'Peters', 5, NULL),
       ('Peter', 'Peters', 6, 9),
       ('Emily', 'Mor', 6, 9),
       ('Jane', 'Doe', 6, 9),
       ('Meg', 'Teson', 7, NULL),
       ('Courtney', 'Ken', 8, 13),
       ('Ken', 'Doe', 8, 13),
       ('Jane', 'Foster', 8, 13);

--        INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ('Connor', 'Savoy', 1),
--        ('Zeke', 'Francia', 2),
--        ('Steve', 'Cardie', 2),
--        ('James', 'Lawson', 2),
--        ('Nick', 'Doe', 3),
--        ('John', 'Johnson', 4),
--        ('Cam', 'Johnson', 4),
--        ('Ben', 'Ward', 4),
--        ('Jamie', 'Peters', 5),
--        ('Peter', 'Peters', 6),
--        ('Emily', 'Mor', 6),
--        ('Jane', 'Doe', 6),
--        ('Meg', 'Teson', 7),
--        ('Courtney', 'Ken', 8),
--        ('Ken', 'Doe', 8),
--        ('Jane', 'Foster', 8);
