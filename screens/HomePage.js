
import { ConnectWallet } from "@thirdweb-dev/react-native";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../assets/styles';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ConnectView from './connect';
const HomePage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('0');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchUserData = async () => {
    const nameFetch = await AsyncStorage.getItem('name');
    const idFetch = await AsyncStorage.getItem('id');
    setId(idFetch);
    if (nameFetch) {
      setName(nameFetch);
    }
    fetchUserDetails(idFetch);
  };

  const fetchUserDetails = async (userId) => {
    try {
      const requestBody = { id: userId };
      const [transactionResponse, balanceResponse] = await Promise.all([
        fetch('https://app.apexcardservice.com/transactionHistory.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }),
        fetch('https://app.apexcardservice.com/checkBalance.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
      ]);

      if (!transactionResponse.ok || !balanceResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const [transactionData, balanceData] = await Promise.all([
        transactionResponse.json(),
        balanceResponse.json()
      ]);

      if (transactionData) {
        console.log(transactionData);
        setTransactions(transactionData);
      } else {
        console.error('Error: Invalid transaction data');
      }

      if (balanceData) {
        setBalance(balanceData.currentBalance);
      } else {
        console.error('Error: Invalid balance data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
},[id]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressTransaction(item)}>
      <View style={styles.transactionItem}>
        <Text style={styles.senderReceiver}>Sender name: {item.sender_name}</Text>
        <Text style={styles.senderReceiver}>Receiver name: {item.reciever_name}</Text>
        <Text style={styles.transactionDate}>Transaction Date: {item.transaction_date}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    
    <ImageBackgroundComponent>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={[styles.row, styles.cont]}>
          <View style={[styles.column, { flex: 2 }]}>
            <Text style={{ fontSize: 25, marginBottom: 10, color: 'white' }}>
              Hi, {name}
            </Text>
            <Text style={{ color: 'white' }}>
              Your Current Balance is:
            </Text>
          </View>
          <Text style={{
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'right',
            color: 'white',
          }}>{balance} USD </Text>
        </View>
      </View>
      <View style={[{ flex: 2 }, styles.homeContainer]}>
        <View style={styles.containerFirst}>
          <View style={styles.row} >
            <View style={[styles.column, { flex: 1, alignItems: 'center' }]}>
              <TouchableOpacity onPress={() => navigation.navigate('ForumPayPage')}>
                <Ionicons name="send" size={32} color="white" />
                <Text style={{ color: 'white' }}>Send</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.column, { flex: 1, alignItems: 'center' }]}>
            
              <Ionicons name="download" size={32} color="white" />
              <Text style={{ color: 'white' }}>Receive</Text>
            </View>
            <View style={[styles.column, { flex: 1, alignItems: 'center' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('ContactsScreen')}>
              <Ionicons name="arrow-forward" size={32} color="white" />
              <Text style={{ color: 'white' }}>Transfer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      <View style={{ flex: 1, paddingTop: 22 }}>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.tid}
        />
      </View>
      {/* <ConnectView/> */}
      <ConnectWallet />
      </View>
    </ImageBackgroundComponent>
  );
};

export default HomePage;
