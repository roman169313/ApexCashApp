import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';
import styles from '../assets/styles';
const SignupPageExt = ({ navigation }) => {
  return (
    <ImageBackgroundComponent>
    {/* <TransparentNavbar title={{Personal Information}} /> */}
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
      
          style={styles.input}
          placeholder="Enter Phone No...."
        />
        
        <Button
          title="Sign Up"
          onPress={() => {
            // Add your signup logic here
            navigation.navigate('Home'); // Navigate to Home screen after signup
          }}
        />
      </View>
    </View>
    </ImageBackgroundComponent>
  );
};



export default SignupPageExt;
