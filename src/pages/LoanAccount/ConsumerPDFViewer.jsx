import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './consumerPDFViewer.css'; // Import the CSS file

const ConsumerPDFViewer = ({ data, consumerInfo }) => {
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
    textBold: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.sectionTitle}>Consumer Details</Text>
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
        <Text style={styles.sectionTitle}>Transaction History Report</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Transaction No</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Transaction Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Total Loan Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>EMI</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Amount Of Loan Recovery</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Remaining Loan</Text>
            </View>
          </View>
          {/* Table Body */}
          {data.map((curUser, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{new Date(curUser.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{curUser.transaction_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{curUser.type}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{curUser.starting_loan}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{curUser.loan_deposit}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{curUser.amount_of_loan_recovery}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{curUser.total_loan_credit}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return <MyDocument />;
};

export default ConsumerPDFViewer;
