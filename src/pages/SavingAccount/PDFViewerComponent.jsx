import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDFViewerComponent = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  return (
    <div className="pdf-viewer">
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Date</Text>
              <Text>Transaction No</Text>
              <Text>Account Number</Text>
              <Text>Consumer Name</Text>
              <Text>Address</Text>
              <Text>Aadhar No</Text>
              <Text>Mobile Number</Text>
              <Text>Mail Id</Text>
              <Text>Opening Bal</Text>
              <Text>Total Balance</Text>
            </View>
            {data.map((curUser, index) => (
              <View key={index} style={styles.section}>
                <Text>{curUser.date}</Text>
                <Text>{curUser.transaction_no}</Text>
                <Text>{curUser.account_no}</Text>
                <Text>{curUser.consumer_name}</Text>
                <Text>{curUser.address}</Text>
                <Text>{curUser.aadhar_no}</Text>
                <Text>{curUser.mobile_no}</Text>
                <Text>{curUser.mail_id}</Text>
                <Text>{curUser.opening_bal}</Text>
                <Text>{curUser.total_bal}</Text>
              </View>
            ))}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PDFViewerComponent;
