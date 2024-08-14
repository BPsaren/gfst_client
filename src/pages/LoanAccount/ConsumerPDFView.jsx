import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ConsumerPDFView = ({ data, totalAmount, totalLoan, totalRecovery, remainingLoan }) => {
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
      transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effects
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker shade for hover
      color: '#e6e6e6', // Slightly lighter text color on hover
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

        {/* Summary Table */}
        <View style={[styles.table, styles.summaryTable]}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>Total Loan Amount</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>{totalLoan}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>Total Recovery Loan</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>{totalRecovery}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>Remaining Total Loan</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryCell}>{remainingLoan}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="pdf-viewer">
      <PDFDownloadLink document={<MyDocument />} fileName="transaction-history-report.pdf">
        {({ blob, url, loading, error }) => (
          <button
            style={loading ? styles.button : { ...styles.button, ...styles.buttonHover }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.target.style.color = styles.buttonHover.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor;
              e.target.style.color = styles.button.color;
            }}
            disabled={loading}
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ConsumerPDFView ;
