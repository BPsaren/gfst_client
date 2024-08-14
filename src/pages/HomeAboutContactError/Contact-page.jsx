import React from 'react';
import './contact.css'; // Import the external CSS file
import { FaLinkedin, FaFacebook, FaGoogle } from 'react-icons/fa';

export const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Connect with Us</h1>
      <div className="contact-cards">
        <div className="contact-card linkedin">
          <FaLinkedin className="contact-icon" />
          <h3>LinkedIn</h3>
          <p>Follow us on LinkedIn</p>
          <a href="https://www.linkedin.com/in/bishnupada-saren-78a380233/" target="_blank" rel="noopener noreferrer" className="contact-link">Visit Profile</a>
        </div>
        <div className="contact-card facebook">
          <FaFacebook className="contact-icon" />
          <h3>Facebook</h3>
          <p>Like us on Facebook</p>
          <a href="https://www.facebook.com/bishnupada.saren.73/" target="_blank" rel="noopener noreferrer" className="contact-link">Visit Page</a>
        </div>
        <div className="contact-card gmail">
          <FaGoogle className="contact-icon" />
          <h3>Gmail</h3>
          <p>Contact us via Gmail</p>
          <a href="mailto:bishnupadasaren78@gmail.com" className="contact-link">Send Email</a>
        </div>
      </div>
    </div>
  );
};

