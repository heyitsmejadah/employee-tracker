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
    titleDisplay();
});

titleDisplay = () => {
    console.log(`
  === Employee Tracker ===

  Welcome to the Employee Tracking System!
  Type 'help' for a list of commands.
`);
    promptStart();
};

 // Prompt user with options
 const promptStart = () => {
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
                'Update an employee role',
                'Update an employee manager',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View total utilized budget of a department',
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
            case 'View employees by manager':
                showEmployeesByManager();
                break;
            case 'View employees by department':
                showEmployeesByDepartment();
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
            case 'Update an employee manager':
                updateemployeeManager();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'View total utilized budget of a department':
                viewBudget();
                break;
            default:
                console.log('Invalid option');
                break;
        }
    });
}
    function showDepartments() {
        // Query the database to get department data
        connection.query('SELECT * FROM department', (err, results) => {
            if (err) {
                console.error('Error retrieving department data: ' + err.stack);
                return;
            }
            
            // Display department data
            console.log('Department Data:');
            console.table(results);
            promptStart();
        });
    }
    function showRoles() {
        // Query the database to get role data
        connection.query('SELECT * FROM role', (err, results) => {
            if (err) {
                console.error('Error retrieving role data: ' + err.stack);
                return;
            }
            
            // Display role data
            console.log('Role Data:');
            console.table(results);
            promptStart();
        });
    }
    function showEmployees() {
        // Query the database to get employee data
        connection.query('SELECT * FROM employee', (err, results) => {
            if (err) {
                console.error('Error retrieving employee data: ' + err.stack);
                return;
            }
            
            // Display employee data
            console.log('Employee Data:');
            console.table(results);
            promptStart();
        });
    }
    function showEmployeesByManager() {
        // Prompt user for manager ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'manager_id',
                message: 'Enter the ID of the manager:'
            }
        ]).then((answers) => {
            // Query the database to get employee data
            connection.query('SELECT * FROM employee WHERE manager_id = ?', answers.manager_id, (err, results) => {
                if (err) {
                    console.error('Error retrieving employee data: ' + err.stack);
                    return;
                }
                
                // Display employee data
                console.log('Employee Data:');
                console.table(results);
                promptStart();
            });
        });
    }

    function showEmployeesByDepartment() {
        // Prompt user for department ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter the ID of the department:'
            }
        ]).then((answers) => {
            // Query the database to get employee data
            connection.query('SELECT * FROM employee WHERE department_id = ?', answers.department_id, (err, results) => {
                if (err) {
                    console.error('Error retrieving employee data: ' + err.stack);
                    return;
                }
                
                // Display employee data
                console.log('Employee Data:');
                console.table(results);
                promptStart();
            });
        });
    }

    function addDepartment() {
        // Prompt user for new department name
        inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'Enter the name of the new department:'
            }
        ]).then((answers) => {
            // Insert new department into database
            connection.query('INSERT INTO department SET ?', answers, (err, results) => {
                if (err) {
                    console.error('Error inserting department: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Added department to database.');
                promptStart();
            });
        });
    }
    function addRole() {
        // Prompt user for new role information
        inquirer.prompt([
            {
                type: 'input',
                name: 'job_title',
                message: 'Enter the title of the new role:'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary of the new role:'
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter the department ID of the new role:'
            }
        ]).then((answers) => {
            // Insert new role into database
            connection.query('INSERT INTO role SET ?', answers, (err, results) => {
                if (err) {
                    console.error('Error inserting role: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Added role to database.');
                promptStart();
            });
        });
    }
    function addEmployee() {
        // Prompt user for new employee information
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the new employee:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the new employee:'
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Enter the role ID of the new employee:'
            },
            {
                type: 'number',
                name: 'manager_id',
                message: 'Enter the manager ID of the new employee:'
            }
        ]).then((answers) => {
            // Insert new employee into database
            connection.query('INSERT INTO employee SET ?', answers, (err, results) => {
                if (err) {
                    console.error('Error inserting employee: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Added employee to database.');
                promptStart();
            });
        });
    }
    function updateemployeeRole() {
        // Prompt user for employee ID and new role ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'employee_id',
                message: 'Enter the ID of the employee to update:'
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Enter the new role ID for the employee:'
            }
        ]).then((answers) => {
            // Update employee role in database
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], (err, results) => {
                if (err) {
                    console.error('Error updating employee role: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Updated employee role in database.');
                promptStart();
            });
        });
    }
    function updateemployeeManager() {
        // Prompt user for employee ID and new manager ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'employee_id',
                message: 'Enter the ID of the employee to update:'
            },
            {
                type: 'number',
                name: 'manager_id',
                message: 'Enter the new manager ID for the employee:'
            }
        ]).then((answers) => {
            // Update employee manager in database
            connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [answers.manager_id, answers.employee_id], (err, results) => {
                if (err) {
                    console.error('Error updating employee manager: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Updated employee manager in database.');
                promptStart();
            });
        });
    }

    function deleteDepartment() {
        // Prompt user for department ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'id',
                message: 'Enter the ID of the department to delete:'
            }
        ]).then((answers) => {
            // Delete department from database
            connection.query('DELETE FROM department WHERE id = ?', answers.id, (err, results) => {
                if (err) {
                    console.error('Error deleting department: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Deleted department from database.');
                promptStart();
            });
        });
    }

    function deleteRole() {
        // Prompt user for role ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'id',
                message: 'Enter the ID of the role to delete:'
            }
        ]).then((answers) => {
            // Delete role from database
            connection.query('DELETE FROM role WHERE id = ?', answers.id, (err, results) => {
                if (err) {
                    console.error('Error deleting role: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Deleted role from database.');
                promptStart();
            });
        });
    }

    function deleteEmployee() {
        // Prompt user for employee ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'id',
                message: 'Enter the ID of the employee to delete:'
            }
        ]).then((answers) => {
            // Delete employee from database
            connection.query('DELETE FROM employee WHERE id = ?', answers.id, (err, results) => {
                if (err) {
                    console.error('Error deleting employee: ' + err.stack);
                    return;
                }
                
                // Display success message
                console.log('Deleted employee from database.');
                promptStart();
            });
        });
    }
    function viewBudget() {
        // Prompt user for department ID
        inquirer.prompt([
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter the ID of the department:'
            }
        ]).then((answers) => {
            // Query the database to get total utilized budget
            connection.query('SELECT SUM(salary) AS budget FROM role WHERE department_id = ?', answers.department_id, (err, results) => {
                if (err) {
                    console.error('Error retrieving total utilized budget: ' + err.stack);
                    return;
                }
                
                // Display total utilized budget
                console.log('Total utilized budget:');
                console.table(results);
                promptStart();
            });
        });
    }