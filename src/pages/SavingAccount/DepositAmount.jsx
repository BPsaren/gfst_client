import React, { useState } from "react";
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import './depositAmount.css';

const defaultContactFormData = {
  type: 'deposit',
  account_no: '',
  deposit_bal: '',
  remarks: ''
};

export const DepositAmount = () => {
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
    if (window.confirm("Are you sure you want to deposit this amount?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/deposit`, {
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
          toast.success("Money added successfully");
          setMember(defaultContactFormData); // Clear form on successful submission
        } else {
          const errorData = await response.json(); // Handle specific error messages from server
          toast.error(errorData.message || "Money not added");
        }
      } catch (error) {
        console.error("Error adding money:", error);
        toast.error("Money not added");
      }
    }
  };

  return (
    <div className="form-background"> {/* Applied background color class */}
      <section className="form-section">
        <main>
          <div className="section-registration">
            <h1 className="form-heading">Deposit Money</h1>
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
                  value={member.account_no}
                  onChange={handleInput}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="deposit_bal" className="form-label">Deposit Amount</label>
                <input 
                  type="number" 
                  name="deposit_bal"
                  id="deposit_bal"
                  placeholder="Deposit amount"
                  required 
                  autoComplete="off"
                  value={member.deposit_bal}
                  onChange={handleInput}
                  className="form-input"
                />
              </div>

              <button type="submit" className="form-button">Submit</button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};
