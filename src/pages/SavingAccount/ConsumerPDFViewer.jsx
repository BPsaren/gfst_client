import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ConsumerPDFViewer = ({ data, totalAmount }) => {
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
    totalAmount: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

  return (
    <div className="pdf-viewer">
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Text style={styles.sectionTitle}>Monthly Consumer Report</Text>
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
                  <Text style={[styles.tableCell, styles.headerCell]}>Account Number</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.headerCell]}>Consumer Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.headerCell]}>Total Balance</Text>
                </View>
              </View>
              {/* Table Body */}
              {data.map((curUser, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{curUser.date}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{curUser.transaction_no}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{curUser.account_no}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{curUser.consumer_name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{curUser.total_bal}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ConsumerPDFViewer;
