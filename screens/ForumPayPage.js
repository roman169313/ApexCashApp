import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import base64 from 'react-native-base64';
import styles from '../assets/styles';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';

const ForumPayPage = ({ navigation }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [selectedValue, setSelectedValue] = useState('USD');
  const [invoiceAmount, setInvoiceAmount] = useState('');

  const handleStartPayment = () => {
    // Basic Auth credentials
    // const username = '86583485-7ac0-47db-8e91-ed5b732115cf';
    // const password = 'zL62Q8K4A8EQggUAsLEz4tkj9WPJi5ofBQkZWN9ajVqCmBJrqMWiPAByTaAg';
    const username='c1838b0f-83aa-4e91-a8d2-b21c43719749';
    const password='pLMDX4V84Y43405o9bIHxdBnkowjDQZrr-BNl9sFGgJIKWsXgwcYSP9r7w20';
    // Combine username and password with a colon separator
    const credentials = username + ':' + password;

    // Encode the combined string to base64
    const basicAuth = 'Basic ' + base64.encode(credentials);

    // Request data
    const formData = new FormData();
    formData.append('invoice_amount', invoiceAmount);
    formData.append('pos_id', 'POS1');
    formData.append('currency', selectedCurrency);
    formData.append('invoice_currency', selectedValue);
    formData.append('widget_type', '0');
    formData.append('payer_ip_address', '1.1.1.1');
    formData.append('payer_id', '7a9c6dfb-b901-4b29-b992-1e17615b5ec2');

    // API endpoint
    // const apiUrl = 'https://sandbox.api.forumpay.com/pay/v2/StartPayment/';
    const apiUrl='https://api.forumpay.com/pay/v2/StartPayment/';
    // API call with basic authentication and form data
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': basicAuth,
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('ForumPayConfirmationPage', { responseData: data });
    });
  };

  return (
    <ImageBackgroundComponent>
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Currency:</Text>
        <Picker
  selectedValue={selectedValue}
  style={{ height: 50 }}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedValue(itemValue)
  }>
  <Picker.Item label="USD" value="USD" />
  <Picker.Item label="EUR" value="EUR" />
</Picker>
    
        <Text style={styles.label}>Invoice Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={invoiceAmount}
          onChangeText={text => setInvoiceAmount(text)}
        />
        <Text style={styles.label}>Currency:</Text>
        <Picker
  selectedValue={selectedCurrency}
  style={{ height: 50 }}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedCurrency(itemValue)
  }>
  <Picker.Item label="BTC" value="BTC" />
  <Picker.Item label="ETH" value="ETH" />
</Picker>
       
        <Button
          style={styles.button}
          title="Start Payment"
          onPress={handleStartPayment}
        />
      </View>
    </View>
    </ImageBackgroundComponent>
  );
};

export default ForumPayPage;
