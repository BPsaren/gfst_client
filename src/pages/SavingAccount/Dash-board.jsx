import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [recoveryLoanAmount, setRecoveryLoanAmount] = useState(0);
  const [remainingLoanAmount, setRemainingLoanAmount] = useState(0);
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(0);
  const [recoveryInvestmentTotalAmount, setRecoveryInvestmentTotalAmount] = useState(0);
  const [remainingTotalAmount, setRemainingTotalAmount] = useState(0);
  const { authorizationToken } = useAuth();

  // Fetch Loan Holders Data
  const fetchAllLoanHolders = async () => {
    try {
      const response = await fetch("https://gfst-server.vercel.app/api/admin/getallloanholders", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalAmount(data.totalAmount || 0);
        setTotalLoanAmount(data.totalLoanAmount || 0);
        setRecoveryLoanAmount(data.recoveryLoanAmount || 0);
        setRemainingLoanAmount(data.remainingLoanAmount || 0);
      } else {
        console.error("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  // Fetch Investment Data
  const fetchAllInvestmentData = async () => {
    try {
      const response = await fetch("https://gfst-server.vercel.app/api/admin/getallinvestments", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalAmount(data.totalAmount || 0);
        setTotalInvestmentAmount(data.totalInvestmentAmount || 0);
        setRecoveryInvestmentTotalAmount(data.recoveryInvestmentTotalAmount || 0);
        setRemainingTotalAmount(data.remainingTotalAmount || 0);
      } else {
        console.error("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchAllLoanHolders();
    fetchAllInvestmentData();
  }, [authorizationToken]);

  return (
    <section className="admin-dashboard flex flex-col justify-center items-center min-h-screen ">
      <div className="container-loan-data bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-center text-2xl font-bold text-black mb-4">Loan Holders Summary</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Total Amount</th>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Total Loan Amount</th>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Total Recovery Loan</th>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Remaining Total Loan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b p-4 text-sm text-black">{totalAmount}</td>
              <td className="border-b p-4 text-sm text-black">{totalLoanAmount}</td>
              <td className="border-b p-4 text-sm text-black">{recoveryLoanAmount}</td>
              <td className="border-b p-4 text-sm text-black">{remainingLoanAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container-invest-data bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-black mb-4">Investment Holders Summary</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Total Amount</th>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Total Investment Amount</th>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Total Recovery Investment</th>
              <th className="border-b-2 p-4 text-left text-sm font-semibold text-black">Remaining Total Investment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b p-4 text-sm text-black">{totalAmount}</td>
              <td className="border-b p-4 text-sm text-black">{totalInvestmentAmount}</td>
              <td className="border-b p-4 text-sm text-black">{recoveryInvestmentTotalAmount}</td>
              <td className="border-b p-4 text-sm text-black">{remainingTotalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
