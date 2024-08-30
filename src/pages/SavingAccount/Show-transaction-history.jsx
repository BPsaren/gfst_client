// src/components/ShowTransactionHistory.js

import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import TransactionHistoryPDF from './TransactionHistoryPDF';
import "./showTransactionHistory.css";

export const ShowTransactionHistory = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const { authorizationToken } = useAuth();
    const { account_no } = useParams();

    const fetchAllConsumerData = async () => {
        try {
            const response = await fetch(`https://gfst-server.vercel.app/api/admin/transactionhistory/${account_no}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchAllConsumerData();
    }, [account_no]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (user.transaction_no && user.transaction_no.toLowerCase().includes(searchLower)) ||
            (user.type && user.type.toLowerCase().includes(searchLower))
        );
    });

    const consumerInfo = users.length > 0 ? users[0] : {};

    return (
        <section className="admin-users-section">
            <div className="container-transactions">
                {consumerInfo && (
                    <div className="transaction-consumer-details">
                        <p><strong>Account Number:</strong> {consumerInfo.account_no}</p>
                        <p><strong>Consumer Name:</strong> {consumerInfo.consumer_name}</p>
                        <p><strong>Address:</strong> {consumerInfo.address}</p>
                        <p><strong>Aadhar Number:</strong> {consumerInfo.aadhar_no}</p>
                        <p><strong>Mobile Number:</strong> {consumerInfo.mobile_no}</p>
                        <p><strong>Email:</strong> {consumerInfo.mail_id}</p>
                    </div>
                )}
                      
                <input
                    type="text"
                    placeholder="Search by Transaction Num.."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="print-button-of-transaction">
                    <PDFDownloadLink document={<TransactionHistoryPDF consumerInfo={consumerInfo} filteredUsers={filteredUsers} />} fileName="transaction-history.pdf">
                        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
                    </PDFDownloadLink>
                </button>
            </div>
            <div className="table-shadows">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Transaction Type</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Remarks</th>
                            <th>Total Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((curUser) => (
                            <tr key={curUser._id}>
                                <td>{curUser.transaction_no}</td>
                                <td>{new Date(curUser.date).toLocaleDateString()}</td>
                                <td>{curUser.type}</td>
                                <td>{curUser.deposit_bal}</td>
                                <td>{curUser.withdraw_bal}</td>
                                <td>{curUser.remarks}</td>
                                <td>{curUser.total_bal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
