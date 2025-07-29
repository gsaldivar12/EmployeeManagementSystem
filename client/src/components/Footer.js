import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Employee Management System</h3>
            <p>A comprehensive solution for managing employee records, built with modern web technologies.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Employee List</a></li>
              <li><a href="/add">Add Employee</a></li>
              <li><a href="/api/health">API Health</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Technology Stack</h4>
            <ul className="footer-links">
              <li>React.js</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <p>📧 support@ems.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Business St, Tech City, TC 12345</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Employee Management System. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/help">Help & Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 