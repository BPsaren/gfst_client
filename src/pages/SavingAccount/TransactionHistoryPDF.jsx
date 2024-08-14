// src/components/TransactionHistoryPDF.js

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    sectionTitle: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:150,
        marginTop:20,
    },
    totalAmount: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '14.28%', // Adjusted to fit 7 columns evenly
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    textBold: {
        fontWeight: 'bold',
    },
});

const TransactionHistoryPDF = ({ consumerInfo, filteredUsers }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                
                <Text style={styles.textBold}>Account Number: {consumerInfo.account_no}</Text>
                <Text style={styles.textBold}>Consumer Name: {consumerInfo.consumer_name}</Text>
                <Text style={styles.textBold}>Address: {consumerInfo.address}</Text>
                <Text style={styles.textBold}>Aadhar Number: {consumerInfo.aadhar_no}</Text>
                <Text style={styles.textBold}>Mobile Number: {consumerInfo.mobile_no}</Text>
                <Text style={styles.textBold}>Email: {consumerInfo.mail_id}</Text>
            </View>
            <Text style={styles.sectionTitle}>Transaction History Report:</Text>
            <View style={styles.table}>
                {/* Table Header */}
                
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Transaction ID</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Date</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Transaction Type</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Credit</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Debit</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Remarks</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.headerCell]}>Total Balance</Text>
                    </View>
                </View>
                {/* Table Body */}
                {filteredUsers.map((curUser) => (
                    <View key={curUser._id} style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{curUser.transaction_no}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{new Date(curUser.date).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{curUser.type}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{curUser.deposit_bal}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{curUser.withdraw_bal}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{curUser.remarks}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{curUser.total_bal}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default TransactionHistoryPDF;
