import React from 'react';
import './noDataModal.css';

const NoDataModal = ({ onClose }) => {
  return (
    <div className="no-data-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        <h1>No Data Available</h1>
        <p>No data is available for the selected month.</p>
      </div>
    </div>
  );
};

export default NoDataModal;
