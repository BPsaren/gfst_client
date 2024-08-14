import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ConsumerPDFViewerLoan = ({ data, totalAmount, totalLoan, totalRecovery, remainingLoan }) => {
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
      width: '20%',
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
    summaryTable: {
      marginTop: 20,
    },
    summaryRow: {
      flexDirection: 'row',
    },
    summaryCol: {
      width: '50%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },
    summaryCell: {
      margin: 5,
      fontSize: 12,
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: '2px solid #007bff',
      borderRadius: 4,
      textAlign: 'center',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '20px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      color: '#e6e6e6',
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.sectionTitle}>Transaction History Report</Text>
          <Text style={styles.totalAmount}>All Consumers Total Amount: {totalAmount}</Text>
          
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Transaction No</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Account No</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Consumer Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Total Loan Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Amount Of Loan Recovery</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.headerCell]}>Remaining Loan</Text>
            </View>
          </View>
          {data.map((user) => (
            <View style={styles.tableRow} key={user._id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{new Date(user.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.transaction_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.account_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.consumer_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.starting_loan}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.amount_of_loan_recovery}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.total_loan_credit}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.summaryTable}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>Total Loan Amount: {totalLoan}</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>Amount of Loan Recovery: {totalRecovery}</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>Remaining Loan: {remainingLoan}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={<MyDocument />} fileName="transaction_history_report.pdf">
      {({ loading }) => (
        <div className={styles.button}>
          {loading ? "Generating PDF..." : "Download Transaction History Report"}
        </div>
      )}
    </PDFDownloadLink>
  );
};

export default ConsumerPDFViewerLoan;
