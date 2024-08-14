import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const TransactionPDFViewer = ({ data, consumerInfo }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol: {
      width: '14.28%',
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
    },
    sectionTitle: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    consumerDetails: {
      marginBottom: 20,
      fontSize: 14,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Consumer Details</Text>
        <View>
          {consumerInfo && (
             <View>
             <Text style={styles.textBold}>Account Number: {consumerInfo.account_no}</Text>
             <Text style={styles.textBold}>Consumer Name: {consumerInfo.consumer_name}</Text>
             <Text style={styles.textBold}>Address: {consumerInfo.address}</Text>
             <Text style={styles.textBold}>Aadhar Number: {consumerInfo.aadhar_no}</Text>
             <Text style={styles.textBold}>Mobile Number: {consumerInfo.mobile_no}</Text>
             <Text style={styles.textBold}>Email: {consumerInfo.mail_id}</Text>
           </View>
          )}
        </View>
        <Text style={styles.sectionTitle}>Investment Transaction History</Text>
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
              <Text style={[styles.tableCell, styles.headerCell]}>Total Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>EMI</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Amount Recovery</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Remaining Amount</Text>
            </View>
          </View>
          {/* Table Body */}
          {data.map((transaction, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.transaction_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{new Date(transaction.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.type}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.investment_of_customers_business}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.profit_on_customer_investment}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.amount_of_investment_recovery}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.individual_total__investment}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default TransactionPDFViewer;
