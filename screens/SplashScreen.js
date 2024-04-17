import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const SplashScreenPage = () => {
  const navigation = useNavigation();

 

  useEffect(() => {
    const loadScreen = async () => {
      const isFirstOpen = await AsyncStorage.getItem('isFirstOpen');
      
      const log = await AsyncStorage.getItem('token');
      if (!isFirstOpen) {
        AsyncStorage.setItem('isFirstOpen', 'true');
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomePage' }],
        });
      } else {
        // logout();
        const timer = setTimeout(() => {
          {if(log!==null){
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            });

          }else{
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginPage' }],
            });
          }}
          
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    loadScreen();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={ require('../assets/cashApp.jpg') } // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.text}>Apex NFT Pay</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Background color of the container
  },
  image: {
    width: 200, // Adjust the width as needed
    height:40,
    marginBottom: 20, // Add margin to create space between the image and text
  },
  text: {
    fontSize: 40,
    color: '#fff',
  },
});


export default SplashScreenPage;
