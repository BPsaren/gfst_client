import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './consumerPDFViewerInvestment.css'; // Import the external CSS file for button styles

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: '10px',
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: 5,
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
});

const DownloadButton = ({ loading }) => (
  <button className="download-pdf-button">
    {loading ? 'Generating PDF...' : 'Download'}
  </button>
);

const ConsumerPDFViewerInvestment = ({ data, totalAmount, totalInvestment, totalRecovery, remainingInvestment }) => (
  <PDFDownloadLink
    document={
      <Document>
        <Page style={styles.page}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.header]}>Date</Text>
              <Text style={[styles.tableCell, styles.header]}>Transaction No</Text>
              <Text style={[styles.tableCell, styles.header]}>Account Number</Text>
              <Text style={[styles.tableCell, styles.header]}>Consumer Name</Text>
              <Text style={[styles.tableCell, styles.header]}>Total Investment Amount</Text>
              <Text style={[styles.tableCell, styles.header]}>EMI</Text>
              <Text style={[styles.tableCell, styles.header]}>Amount Of Investment Recovery</Text>
              <Text style={[styles.tableCell, styles.header]}>Remaining Investment</Text>
            </View>
            {data.map((item) => (
              <View style={styles.tableRow} key={item._id}>
                <Text style={styles.tableCell}>{new Date(item.date).toLocaleDateString()}</Text>
                <Text style={styles.tableCell}>{item.transaction_no}</Text>
                <Text style={styles.tableCell}>{item.account_no}</Text>
                <Text style={styles.tableCell}>{item.consumer_name}</Text>
                <Text style={styles.tableCell}>{item.investment_of_customers_business}</Text>
                <Text style={styles.tableCell}>{item.profit_on_customer_investment}</Text>
                <Text style={styles.tableCell}>{item.amount_of_investment_recovery}</Text>
                <Text style={styles.tableCell}>{item.individual_total__investment}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text>Summary:</Text>
            <Text>All Consumers Total Amount: {totalAmount}</Text>
            <Text>Total Investment Amount: {totalInvestment}</Text>
            <Text>Total Recovery Investment: {totalRecovery}</Text>
            <Text>Remaining Total Investment: {remainingInvestment}</Text>
          </View>
        </Page>
      </Document>
    }
    fileName="investment-monthly-audit.pdf"
  >
    {({ loading }) => <DownloadButton loading={loading} />}
  </PDFDownloadLink>
);

export default ConsumerPDFViewerInvestment;
