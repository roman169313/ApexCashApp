import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const TransparentNavbar = ({ title }) => {
  // const renderBackButton = () => {
    
  //     return <HeaderBackButton tintColor="white" onPress={() => {}} />;
   
  // };

  return (
    <View style={styles.appBar}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => console.log('Search icon pressed')}>
        <Text style={styles.actionText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('More icon pressed')}>
        <Text style={styles.actionText}>More</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = {
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50, // Adjust the height as needed
    backgroundColor: '#007bff', // App bar background color
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Title text color
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    color: '#fff', // Action button text color
    marginLeft: 16, // Spacing between action buttons
  },
};
export default TransparentNavbar;
