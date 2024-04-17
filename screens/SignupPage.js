import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert,Image } from 'react-native';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';
import styles from '../assets/styles';
import authCreate from '../api/authCreate';
const SignupPage = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleSignUp=()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailRegex.test(email)) {
            Alert.alert('Please enter a valid email address.'); // Show snackbar with error message
            return;
        }

        // Validate password length
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.'); // Show snackbar with error message
            return;
        }
        if (fullName.length === null) {
          Alert.alert('Please Enter Your Name'); // Show snackbar with error message
          return;
      }
      if (phoneNo.length === null) {
        Alert.alert('Please Enter your Phone NO'); // Show snackbar with error message
        return;
    }
        authCreate(navigation,fullName,email,password,phoneNo)
  }

  return (
    <ImageBackgroundComponent>
      {/* <TransparentNavbar title={'Sign Up'}  /> */}
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <View style={styles.imageCenter}>
                    <Image
                        source={ require('../assets/bgCashApp.jpg') } // Replace with your image URL
                        style={styles.image}
                    />
                    </View>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Jessica cook"
            onChangeText={text => setFullName(text)}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="jessica@gmail.com"
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="***********"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.label}>Phone No:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => setPhoneNo(text)}
          />
          <Button
            title="Sign Up"
            onPress={handleSignUp}
          />
        </View>
      </View>
    </ImageBackgroundComponent>
  );
};

export default SignupPage;
