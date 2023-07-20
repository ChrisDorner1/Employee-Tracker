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