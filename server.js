const express = require('express');
const question = require('./utils/question');
const db = require('./db/connection');



const PORT = process.env.PORT || 3011;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// view all departments from an api
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Add a department
app.post('/api/department', ({ body }, res) => {
    const errors = question(body, 'department_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO department (department_name)
                    VALUES (?)`;
    const params = [body.department_name];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
  });


// view all roles
app.get('/api/employeerole', (req, res) => {
    const sql = `SELECT * FROM employeerole`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Add a role
app.post('/api/employeerole', ({ body }, res) => {
    const errors = question(body, 'title', 'salary', 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO employeerole (title, salary, department_id)
                    VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
  });

  // view all employees
app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


// Add an employee
app.post('/api/employee', ({ body }, res) => {
    const errors = question(body, 'first_name', 'last_name', 'role_id', 'manager_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_name)
                    VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_name];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
  });

// Update an employee role 
app.put('/api/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found!'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
app.use((req, res)=>{
  res.status(404).end(); 
})


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });