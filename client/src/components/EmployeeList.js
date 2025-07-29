import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI } from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeAPI.getAll();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await employeeAPI.delete(id);
      setEmployees(employees.filter(emp => emp._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || 'Error deleting employee');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Employee List</h2>
        <Link to="/add" className="btn btn-primary">
          Add New Employee
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {employees.length === 0 ? (
        <div className="empty-state">
          <h3>No employees found</h3>
          <p>Get started by adding your first employee.</p>
          <Link to="/add" className="btn btn-primary">
            Add Employee
          </Link>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Date of Hire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.fullName}</td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
                <td>{formatSalary(employee.salary)}</td>
                <td>{formatDate(employee.dateOfHire)}</td>
                <td className="table-actions">
                  <Link 
                    to={`/edit/${employee._id}`} 
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleteConfirm(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ maxWidth: '400px', margin: '20px' }}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-warning"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList; 