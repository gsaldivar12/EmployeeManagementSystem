const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [50, 'Department cannot exceed 50 characters']
  },
  role: {
    type: String,
    required: [true, 'Role/Position is required'],
    trim: true,
    maxlength: [50, 'Role cannot exceed 50 characters']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  dateOfHire: {
    type: Date,
    required: [true, 'Date of hire is required'],
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
employeeSchema.index({ fullName: 1 });
employeeSchema.index({ department: 1 });

module.exports = mongoose.model('Employee', employeeSchema); 