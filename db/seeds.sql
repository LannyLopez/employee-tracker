INSERT INTO department (department_name)
VALUES 
('Cashier'),
('Customer Support'),
('Front Of House Manager'),
('General Manager');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Cashier', 32000.00, 1),
('Customer Support', 35850.00, 2),
('Front Of House Manager', 39200.00, 3),
('General Manager', 68900.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id , department_id)
VALUES 
('Tomas', 'Evans', 1, 3, 1),
('Kevin', 'Owens', 1, 3, 1),
('Joesph', 'Smith',2, 4, 2 ),
('Noah', 'Belichick',2, 4, 2),
('Jennifer','Kali',3, 4,3),
('Sarah', 'DeLuka', 3, 4,3),
('Olivia', 'Toei', 4, 4,4);

