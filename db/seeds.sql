



-- Sample --
-- departments
INSERT INTO department (name) VALUES ('HR');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');

-- Insert roles
INSERT INTO role (title,salary, department_id) VALUES ('HR Manager', 60000, 1);
INSERT INTO role (title,salary, department_id) VALUES ('Sales Associate', 40000, 2);
INSERT INTO role (title,salary, department_id) VALUES ('Software Engineer', 90000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Johnson', 3, 1);