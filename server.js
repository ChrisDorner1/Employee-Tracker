const table = require("console.table")
const inquirer = require("inquirer")
const sql = require("mysql2")

const art = require('asciiart-logo')
const config = require('./package.json')
console.log(art(config).render())

const db = sql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Now accessing the employee database')
)

const questions = [{
    type: "list",
    name: "action",
    message: "What action would you like to preform?",
    choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Role",
        "Delete Department",
        "Remove Employee",
        "View Employees in Department",
        "View Managers Employees",
        "Exit"
    ]
}]

function init() {
    inquirer.prompt(questions)
    .then((answer) => {
        if (answer.action === "View Departments") {
            viewDepartments()
        }else if (answer.action === "View Roles") {
            viewRoles()
        }else if (answer.action === "View Employees") {
            viewEmployees()
        }else if (answer.action === "Add Department") {
            addDepartment()
        }else if (answer.action === "Add Role") {
            addRole()
        }else if (action.answer === "Add Employee") {
            addEmployee()
        }else if (action.answer === "Update Employee Role") {
            updateRole()
        }else if (action.answer === "Update Employee Manager"){
            updateManager()
        }else if (action.answer === "Delete Role") {
            deleteRole()
        }else if (action.answer === "Delete Department") {
            deleteDepartment()
        }else if (action.answer === "Remove Employee") {
            banish()
        }else if (action.answer === "View Employees in Department"){
            viewInDepartment()
        }else if (action.answer === "View Managers Employees"){
            viewManagerEmp()
        }else if (acton.answer === "Exit"){
            console.log("You are now leaving the employee database. Goodbye!")
            process.exit()
        }
    })
}


function viewDepartments() {
    console.log("Viewing Departments")
    db.query('SELECT * FROM department', (err, results) => {
        console.table(results);
        init()
    })
}

function viewRoles() {
    console.log("Viewing Roles")
    db.query(`SELECT * FROM role.id, role.title, role.salary, department.dept_name AS deparement FROM role
    JOIN department ON role.dept_id = department.id`,
    db.query(sql, (err, results) => {
        console.table(results)
        init()
    }))
}

function viewEmployees() {
    console.log("Now Viewing All Employees")

    const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name,
    CONCAT(e.first_name, ' ', e.last_name) AS Manager
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON department.id = role.dept_id
    LEFT JOIN employee e ON employee.manager_id = e.id`
    db.query(sql, (err, results) => {
        console.table(results)
        init()
    })
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'dep',
        message: "What is the name of the department you wish to create?"
    })
    .then((answer) => {
        db.query('INSERT INTO department SET ?', {dept_name: answer.dep}, (err, results)=> {
            viewDepartments()
            console.log("New Department successfully created")
        })
    })
}

function addRole() {
    inquirer.prompt({
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role you wish to create?'
    },{
        type: 'input',
        name: 'rolePay',
        message: 'How much does this role recieve on payrole? Must be a number, do not include dollar sign.'
    },{
        type: 'list',
        name: 'roleDept',
        message: 'in what department does this new role belong?',
        choices: departments
    })
    .then ((answer) => {
        db.query('INSERT INTO role SET ?', {title: answer.roleName, salary: answer.rolePay, dept_id: answer.roleDept}, (err, results) => {
            console.log(answer)
            viewRoles()
            console.log('New Role successfylly created')
        })
    })
}

function addEmployee() {
    db.query('SELECT * FROM employee', (err, mResponse) => {
        const managers = [
            {
                name: "noManager",
                value: 0
            }
        ]
        mResponse.forEach(({ first_name, last_name, id}) => {
            managers.push({
                name: first_name + " " + last_name,
                value: id
            })
        })
        db.query('SELECT * FROM role', (err, rResponse) => {
            const roles = []
            rResponse.forEach(({ title, id }) => {
                roles.push({
                    name: title,
                    value: id
                })
            })
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'empFirst',
                    message: 'Please enter the employees first name'
                },{
                    type: 'input',
                    name: 'empLast',
                    message: 'Please enter the emplyees last name'
                },{
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Please choose the role the employee will be taking',
                    choices: role
                },{
                    type: 'list',
                    name: 'employeeManager',
                    message: 'Please choose the employees manager if applicable',
                    choices: managers
                }
            ])
            .then((answer) => {
                db.query('INSERT INTO employee SET ?', {
                    first_name: answer.empFirst,
                    last_name: answer.empLast,
                    role_id: answer.employeeRole,
                    manager_id: answer.employeeManager
                }, (err, result) => {
                    if (err) throw err;
                    viewEmployees()
                    console.log('Employee successfully added to database')
                })
            })
        })
    })
}

function updateRole() {
    db.query('SELECT * FROM employee', (err, empResp) => {
        const updateRole =[]
        empResp.forEach(({ first_name, last_name, id}) => {
            updateRole.push({
                name: first_name + ' ' + last_name,
                value: id
            })
        })
        db.query('SELECT * FROM role', (err, roleResp) => {
            const role =[]
            roleResp.forEach(({ title, id }) => {
                role.push({
                    name: title,
                    value: id
                })
            })
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Please select the employee you would like to update',
                    choices: updateRole
                },{
                    type: 'list',
                    name: 'newRole',
                    message: 'What is this employees new role?',
                    choices: "role"
                }
            ])
            .then((answer) => {
                db.query(`UPDATE employee SET role_id = ${answer.role} WHERE id = ${answer.employee}`, (err, res) => {
                    viewEmployees()
                    console.log("Role updated Successfully")
                })
            })
        })
    })
}

function updateManager () {
    db.query('SELECT * FROM employee', (err, mResp) => 
    {
        const manager = []
        mResp.forEach (({ first_name, last_name, id }) => {
            manager.push({
                name: first_name + " " + last_name,
                value: id
            })
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Please select the employee who is changing managers',
                choices: manager
            },{
                type: 'list',
                name: 'updatedManager',
                message: 'Select the new manager',
                choices: manager
            }
        ])
        .then((answer) => {
            db.query(`UPDATE employee SET manager_id = ${answer.updatedManager} WHERE id ${answer.employee}`, () => {
                console.log("Employee manager has been updated")
                viewEmployees()
            })
        })
    })
}

function deleteDepartment() {
    db.query('SELECT * FROM department', (err, deptRes) => {
        const depts = []
        deptRes.forEach(({ dept_name, id }) => {
            departments.push({
                name: dept_name,
                value: id
            })
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'dept',
                message: 'Which department is going to be deleted',
                choices: depts
            }, {
                type: 'list',
                name: 'PROCEED',
                message: 'This department will be permanently deleted along will all the roles and employees assigned to said roles.',
                choices: ["NO GO BACK", "YES I WISH TO DELETE THIS DEPARTMENT"]
            }
        ])
        .then((answer) => {
            if (answer.PROCEED === "NO GO BACK") {
                init()
            } else {
                db.query(`DELETE FROM department WHERE id = ${answer.dept}`, (err, res) => {
                    viewDepartments()
                    console.log(`${answer.dept} was successfully deleted`)
                })
            }
        })
    })
}

function deleteRole() {
    db.query('SELECT * FROM role', (err, rResp) => {
        const role =[]
        rResp.forEach(({ title, id }) => {
            role.push({
                name: title,
                value: id
            })
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'roles',
                message: 'What role is going to be deleted?',
                choices: role
            }, {
                type: 'list',
                name: 'PROCEED',
                message: 'This role will be permanently deleted along will the employees assigned to said role.',
                choices: ["NO GO BACK", "YES I WISH TO DELETE THIS ROLE"]
            }
        ])
        .then((answer) => {
            if (answer.PROCEED === "NO GO BACK") {
                init()
            } else {
                db.query(`DELETE * FROM role WHERE id = ${answer.roles}`, (err, res) => {
                    viewRoles()
                    console.log(`${answer.roles} was successfully deleted`)
                })
            }
        })
    })
}

function banish() {
    db.query('SELECT * FROM employee', (err, eResp) => 
    {
        const employee = []
        eResp.forEach (({ first_name, last_name, id }) => {
            employee.push({
                name: first_name + " " + last_name,
                value: id
            })
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Please select the employee who is being deleted',
                choices: employee
            },{
                type: 'list',
                name: 'PROCEED',
                message: 'This employee will be deleted permanently are you certain?',
                choices: ["NO GO BACK", "YES I WISH TO DELETE THIS EMPLOYEE"]
            }
        ])
        .then((answer) => {
            if (answer.PROCEED === "NO GO BACK") {
                viewEmployees()
            } else {
                db.query(`DELETE FROM employee WHERE id = ${answer.employee}`, (err, res) => {
                    viewEmployees()
                    console.log(`${answer.employee} has successfully been deleted`)
                })
            }
        })
    })
}

function viewInDepartment() {
    db.query('SELECT * FROM department', (err, deptRes) => {
        const depts = []
         deptRes.forEach(({ dept_name, id }) => {
            depts.push ({
                name: dept_name, 
                value: id
            })
         })
         inquirer.prompt([
            {
                type: 'list',
                name: 'depos',
                message: "Which departments employees would you like to see?",
                choices: depts
            }
         ])
         .then ((answer) => {
            db.query(`SELECT emp.first_name, emp.last_name, dep.dept_name, rl.title FROM employee AS emp JOIN role as rl on emp.role_id = rl.id JOIN departments AS dep ON rl.dept_id = dep.id WHERE dep.id = ${answer.depts}  ORDER BY dep.dept_name, emp.last_name, emp.first_name;`, (err, res) => {
                console.log(res)
                init()
            })
         })
    })
}

function viewManagerEmp () {}