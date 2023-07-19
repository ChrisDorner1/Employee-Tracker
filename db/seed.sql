INSERT INTO department (dept_name)
VALUES ('Sales'),
       ('Management'),
       ('Accounting'),
       ('IT');

INSERT INTO role (title, salary, dept_id)
VALUES ('Library Manager', 65000, 1),
       ('Supervisor', 40000, 1),
       ('Head of IT', 70000, 2),
       ('IT Tech', 55000, 2),
       ('Librarian', 25000, 3),
       ('Assistant Librarian', 15000, 3),
       ('Library IT', 15000, 4),
       ('Library IT Assistant', 14000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Tamera', 'Norwood', null, 1),
       ('Kerri', 'Atkinson', 1, 2),
       ('Christopher', 'Teranova', null, 3),
       ('Terry', 'Abrams', 3, 4),
       ('Christian', 'Dorner', 2, 8),
       ('Caitlin', 'Fish', 1, 6),
       ('Trina', 'Hall', 1, 6),
       ('Maggie', 'Price', 1, 5),
       ('Marry', 'Spite', 1, 5),
       ('Shawn', 'Taugner', 1, 6),
       ('Lourdes', 'Begay', 2, 5);
