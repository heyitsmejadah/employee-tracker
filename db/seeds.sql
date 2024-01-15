-- Insert data into the department table
INSERT INTO department (id, name) VALUES
(1, 'HR'),
(2, 'Finance'),
(3, 'IT');

-- Insert data into the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'HR Manager', 70000, 1),
(2, 'Financial Analyst', 60000, 2),
(3, 'Software Engineer', 80000, 3),
(4, 'IT Manager', 90000, 3);

-- Insert data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1),
(3, 'Bob', 'Johnson', 3, 1),
(4, 'Alice', 'Williams', 4, NULL);