import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';
import './loanDeposit.css'; // Import the external CSS

const defaultContactFormData = {
  type: 'loan_deposit',
  date: '',
  consumer_name: '',
  account_no: '',
  loan_deposit: '',
};

export const LoanDeposit = () => {
  const [member, setMember] = useState(defaultContactFormData);
  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    const confirmed = window.confirm("Are you sure you want to create this loan deposit?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/api/admin/loandeposit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(member),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Loan deposit successfully");
        setMember(defaultContactFormData); // Clear form on successful submission
      } else {
        const errorData = await response.json(); // Handle specific error messages from server
        toast.error(errorData.message || "Money Not Added");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred");
    }
  };

  return (
    <div className="form-container">
      <div className="form-section">
        <h1 className="form-heading">Loan Deposit</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="account_no" className="form-label">Account Number</label>
            <input 
              type="number" 
              name="account_no"
              id="account_no"
              placeholder="Enter account number"
              required 
              autoComplete="off"
              className="form-input"
              value={member.account_no}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loan_deposit" className="form-label">Loan Deposit Amount</label>
            <input 
              type="number" 
              name="loan_deposit"
              id="loan_deposit"
              placeholder="Enter loan deposit amount"
              required 
              autoComplete="off"
              className="form-input"
              value={member.loan_deposit}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};
