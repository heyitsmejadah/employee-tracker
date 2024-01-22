-- Insert data into the department table
INSERT INTO department (department_name) VALUES
('HR'),
('Finance'),
('IT');

-- Insert data into the role table
INSERT INTO role (job_title, salary, department_id) VALUES
('HR Manager', 70000, 1),
('Financial Analyst', 60000, 2),
('Software Engineer', 80000, 3),
('IT Manager', 90000, 3);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id, job_title, department_name, salary) VALUES
('John', 'Doe', 1, NULL, 'HR Manager', 'HR', 70000),
('Jane', 'Smith', 2, 1, 'Financial Analyst', 'Finance', 60000),
('Bob', 'Johnson', 3, 1, 'Software Engineer', 'IT', 80000),
('Alice', 'Williams', 4, NULL, 'IT Manager', 'IT', 90000);
