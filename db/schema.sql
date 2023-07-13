DROP DATABASE IF EXISTS employee_counter_db
CREATE DATABASE employee_counter_db;

USE employee_counter_db:

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
),

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (department_id),
    REFERENCES department(id),
    ON DELETE CASCADE,
    ON UPDATE NO ACTION
),

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    ON UPDATE NO ACTION
)