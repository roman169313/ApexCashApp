import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert,Image } from 'react-native';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';
import styles from '../assets/styles';
import auth from '../api/auth';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailRegex.test(username)) {
            Alert.alert('Please enter a valid email address.'); // Show snackbar with error message
            return;
        }

        // Validate password length
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.'); // Show snackbar with error message
            return;
        }

        // Perform login
        auth(navigation, username, password);
    };

 

    return (
        <ImageBackgroundComponent>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                <View style={styles.imageCenter}>
                    <Image
                        source={ require('../assets/bgCashApp.jpg') } // Replace with your image URL
                        style={styles.image}
                    />
                    </View>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="dummy@gmail.com"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here..."
                        secureTextEntry={true} // For password fields
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Button
                        title="Login"
                        onPress={handleLogin} // Use the handleLogin function for validation and login
                    />
                    <View style={styles.redirect}>
                        <Text>New user! </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
                            <View>
                                <Text style={styles.Login}>Create New Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackgroundComponent>
    );
};

export default LoginPage;
