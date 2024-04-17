import React,{useEffect} from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import base64 from 'react-native-base64';
import styles from '../assets/styles';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';
const ForumPayConfirmationPage = ({ navigation, route }) => {
  const { responseData } = route.params;
  const data = JSON.parse(JSON.stringify(responseData));
 
  const handleConfirmPayment = () => {
    // Basic Auth credentials
    // const username = '86583485-7ac0-47db-8e91-ed5b732115cf';
    // const password = 'zL62Q8K4A8EQggUAsLEz4tkj9WPJi5ofBQkZWN9ajVqCmBJrqMWiPAByTaAg';
    const username='c1838b0f-83aa-4e91-a8d2-b21c43719749';
    const password='pLMDX4V84Y43405o9bIHxdBnkowjDQZrr-BNl9sFGgJIKWsXgwcYSP9r7w20';
    const credentials = username + ':' + password;
    const basicAuth = 'Basic ' + base64.encode(credentials);

    // API endpoint
    // const apiUrl = `https://sandbox.api.forumpay.com/pay/v2/AcceptPayment/?pos_id=POS1&payment_id=${data.payment_id}&currency=${data.currency}&accepted_invoice_amount=${data.InvoiceAmount}`;
    const apiUrl = `https://api.forumpay.com/pay/v2/AcceptPayment/?pos_id=POS1&payment_id=${data.payment_id}&currency=${data.currency}&accepted_invoice_amount=${data.InvoiceAmount}`;
    // API call with basic authentication and form data
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': basicAuth,
      },
    })
    .then(response => response.json())
    .then(data => {
      Alert.alert(
        'Payment status',
        data.status && data.err,
        [
          {
            text: 'OK',
            onPress: () => {
              // Perform navigation here
              navigation.pop();
            },
          },
        ],
        { cancelable: false }
      );
      console.log(data);
    });
  }

  const handleCancelPayment = () => {
    // Basic Auth credentials
    // const username = '86583485-7ac0-47db-8e91-ed5b732115cf';
    // const password = 'zL62Q8K4A8EQggUAsLEz4tkj9WPJi5ofBQkZWN9ajVqCmBJrqMWiPAByTaAg';
    const username='c1838b0f-83aa-4e91-a8d2-b21c43719749';
    const password='pLMDX4V84Y43405o9bIHxdBnkowjDQZrr-BNl9sFGgJIKWsXgwcYSP9r7w20';
    const credentials = username + ':' + password;
    const basicAuth = 'Basic ' + base64.encode(credentials);

    // API endpoint
    // const apiUrl = `https://sandbox.api.forumpay.com/pay/v2/CancelPayment/?pos_id=POS1&currency=${data.currency}&payment_id=${data.payment_id}&address=${data.address}`;
    const apiUrl = `https://api.forumpay.com/pay/v2/CancelPayment/?pos_id=POS1&currency=${data.currency}&payment_id=${data.payment_id}&address=${data.address}`;
    // API call with basic authentication and form data
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': basicAuth,
      },
    })
    .then(response => response.json())
    .then(data => {
        Alert.alert(
          'Payment status',
          data.status,
          [
            {
              text: 'OK',
              onPress: () => {
                // Perform navigation here
                navigation.pop();
              },
            },
          ],
          { cancelable: false }
        );
      console.log(data);
    });
  }

  const handleCheckPayment = () => {
    // Basic Auth credentials
    // const username = '86583485-7ac0-47db-8e91-ed5b732115cf';
    // const password = 'zL62Q8K4A8EQggUAsLEz4tkj9WPJi5ofBQkZWN9ajVqCmBJrqMWiPAByTaAg';
    const username='c1838b0f-83aa-4e91-a8d2-b21c43719749';
    const password='pLMDX4V84Y43405o9bIHxdBnkowjDQZrr-BNl9sFGgJIKWsXgwcYSP9r7w20';
    const credentials = username + ':' + password;
    const basicAuth = 'Basic ' + base64.encode(credentials);

    // API endpoint
    // const apiUrl = `https://sandbox.api.forumpay.com/pay/v2/CheckPayment/?pos_id=POS1&currency=${data.currency}&payment_id=${data.payment_id}&address=${data.address}`;
    const apiUrl = `https://api.forumpay.com/pay/v2/CheckPayment/?pos_id=POS1&currency=${data.currency}&payment_id=${data.payment_id}&address=${data.address}`;
    // API call with basic authentication and form data
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': basicAuth,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.confirmed);
      console.log(data);
      if(!data.confirmed && data.cancelled){
        setTimeout(handleCheckPayment, 5000);
      }
    });
  }
  const renderItem = (label, value) => (
    <View style={styles.gridItem}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  useEffect(()=>{
    handleCheckPayment();
  },[])
  return (
    <ImageBackgroundComponent>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Payment Confirmation Page</Text>
      <Image
        style={styles.qrCode}
        source={{ uri: data.qr_img }}
      />
      <View style={styles.gridContainer}>
        {/* {renderItem('Access Token', data.access_token)}
        {renderItem('Access URL', data.access_url)} */}
        {renderItem('Address', data.address)}
        {renderItem('Amount', data.amount)}
        {renderItem('Amount Exchange', data.amount_exchange)}
        {renderItem('Currency', data.currency)}
        {renderItem('Fast Transaction Fee', data.fast_transaction_fee)}
        {renderItem('Fast Transaction Fee Currency', data.fast_transaction_fee_currency)}
        {renderItem('Invoice Amount', data.invoice_amount)}
        {renderItem('Invoice Currency', data.invoice_currency)}
        {renderItem('Min Confirmations', data.min_confirmations)}
        {renderItem('Network Processing Fee', data.network_processing_fee)}
        {renderItem('Payment ID', data.payment_id)}
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancelPayment}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleConfirmPayment}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackgroundComponent>
  );
};


export default ForumPayConfirmationPage;
