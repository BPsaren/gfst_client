import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import PDFViewerComponent from './PDFViewerComponent'; // Import the PDFViewerComponent
import './findAccount.css';




export const FindAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [viewCustomer, setViewCustomer] = useState([]);
  const [showPDFViewer, setShowPDFViewer] = useState(false); // State to toggle PDF viewer
  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/admin/findaccount?account_no=${selectedAccount}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setViewCustomer(data);
        setShowPDFViewer(true); // Show PDF viewer after fetching data
        toast.success("Data fetched successfully");
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    // Optionally, you can perform any initial data fetching here
  }, []);

  return (
    <div className="find-accounts-container">
      <section className="find-accounts-section">
        <div className='viewCustomerAccount-contain'>
        <h1 className="find-accounts-heading">View Customer Account</h1>
        </div>
        <div className="find-accounts-form">
          <form onSubmit={handleSubmit}>
            <div className="find-accounts-form-group">
              <label htmlFor="account_no" className="find-accounts-label">Account Number</label>
              <input
                type="number"
                name="account_no"
                id="account_no"
                className="find-accounts-input"
                value={selectedAccount}
                onChange={handleInput}
              />
            </div>
            <button type="submit" className="find-accounts-button">
              Submit
            </button>
          </form>
        </div>
        {showPDFViewer && <PDFViewerComponent data={viewCustomer} />} {/* Conditionally render PDFViewerComponent */}
      </section>
    </div>
  );
};
