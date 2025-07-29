import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    role: '',
    salary: '',
    dateOfHire: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role/Position is required';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!formData.dateOfHire) {
      newErrors.dateOfHire = 'Date of hire is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await employeeAPI.create({
        ...formData,
        salary: parseFloat(formData.salary)
      });
      navigate('/', { state: { message: 'Employee added successfully!' } });
    } catch (error) {
      setSubmitError(error.message || 'Error adding employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add New Employee</h2>
      </div>

      {submitError && (
        <div className="alert alert-danger">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-control ${errors.fullName ? 'error' : ''}`}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="department" className="form-label">
            Department *
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`form-control ${errors.department ? 'error' : ''}`}
            placeholder="Enter department"
          />
          {errors.department && (
            <div className="error-message">{errors.department}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role" className="form-label">
            Role/Position *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`form-control ${errors.role ? 'error' : ''}`}
            placeholder="Enter role/position"
          />
          {errors.role && (
            <div className="error-message">{errors.role}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">
            Salary *
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className={`form-control ${errors.salary ? 'error' : ''}`}
            placeholder="Enter salary"
            min="0"
            step="0.01"
          />
          {errors.salary && (
            <div className="error-message">{errors.salary}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfHire" className="form-label">
            Date of Hire *
          </label>
          <input
            type="date"
            id="dateOfHire"
            name="dateOfHire"
            value={formData.dateOfHire}
            onChange={handleChange}
            className={`form-control ${errors.dateOfHire ? 'error' : ''}`}
          />
          {errors.dateOfHire && (
            <div className="error-message">{errors.dateOfHire}</div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee; 