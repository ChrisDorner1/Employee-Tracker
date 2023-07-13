INSERT INTO department (dept_name)
Values ('Sales'),
        ("Management"),
        ("Accounting"),
        ("IT")
INSERT INTO rolse (title, salary, departmanent_id)
VALUES ("Library Manager", 65000, 1),
       ("Supervisior", 40000, 1),
       ('Head of IT', 70000, 2),
      ("IT Tech", 55000, 2),
      ("Librarian", 25000, 3),
      ("Assistant Librarian", 15000, 3),
      ("Library IT", 15000, 4),
      ("Library IT Assistant", 14000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tamera", "Norwood", 1, null),
        ("Kerri", "Atkinson", 2, 1),
        ("Christopher", "Teranova", 3, null),
        ("Terry", "Abrams", 4, 3),
        ("Christian", "Dorner", 8, 2),
        ("Caitlin", "Fish", 6, 1),
        ("Trina", "Hall", 6, 1),
        ("Maggie", "Price", 5, 1),
        ("Marry", "Spite", 5, 1),
        ("Shawn", "Taugner", 6, 1),
        ("Lourdes", "Begay", 5, 2)