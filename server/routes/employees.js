const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET /api/employees - Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// POST /api/employees - Create new employee
router.post('/', async (req, res) => {
  try {
    const { fullName, department, role, salary, dateOfHire } = req.body;

    // Validate required fields
    if (!fullName || !department || !role || !salary) {
      return res.status(400).json({ 
        message: 'Full name, department, role, and salary are required' 
      });
    }

    // Validate salary is a positive number
    if (isNaN(salary) || salary <= 0) {
      return res.status(400).json({ 
        message: 'Salary must be a positive number' 
      });
    }

    const employee = new Employee({
      fullName,
      department,
      role,
      salary: Number(salary),
      dateOfHire: dateOfHire || new Date()
    });

    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: 'Error creating employee' });
  }
});

// GET /api/employees/:id - Get single employee
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
    res.status(500).json({ message: 'Error fetching employee' });
  }
});

// PUT /api/employees/:id - Update employee
router.put('/:id', async (req, res) => {
  try {
    const { fullName, department, role, salary, dateOfHire } = req.body;

    // Validate required fields
    if (!fullName || !department || !role || !salary) {
      return res.status(400).json({ 
        message: 'Full name, department, role, and salary are required' 
      });
    }

    // Validate salary is a positive number
    if (isNaN(salary) || salary <= 0) {
      return res.status(400).json({ 
        message: 'Salary must be a positive number' 
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        department,
        role,
        salary: Number(salary),
        dateOfHire: dateOfHire || new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

module.exports = router; 