import React from 'react';
import './noDataModalLoan.css';

const NoDataModalLoan = ({ onClose }) => {
  return (
    <div className="no-data-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        <h2>No Data Available</h2>
        <p>No data is available for the selected month.</p>
      </div>
    </div>
  );
};

export default NoDataModalLoan;
