const mysql = require('mysql2');
const inquirer = require('inquirer');
// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

 // Prompt user with options
 inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then((answers) => {
        // Handle user's choice
        switch (answers.option) {
            case 'View all departments':
                showDepartments();
                break;
            case 'View all roles':
                showRoles();
                break;
            case 'View all employees':
                showEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
               addEmployee();
                break;
            case 'Update an employee role':
                updateemployeeRole();
                break;
            default:
                console.log('Invalid option');
                break;
        }
    });

