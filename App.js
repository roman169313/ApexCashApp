// src/App.js
// Import polyfills
import "@thirdweb-dev/react-native-compat";
import { ThirdwebProvider } from "@thirdweb-dev/react-native";
// import './crypto-polyfill.js'
import * as SplashScreen from 'expo-splash-screen';
// import '@walletconnect/react-native-compat'
// import { WagmiConfig } from 'wagmi'
// import { mainnet, polygon, arbitrum } from 'viem/chains'
// import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import ForumPayConfirmationPage from './screens/ForumPayConfirmationPage';
import ForumPayPage from './screens/ForumPayPage';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';
import SplashScreenPage from './screens/SplashScreen';
import WelcomePage from './screens/WelcomePage';
import SignupPageExt from './screens/SignUpPageExt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationOptions from './components/NavigationContainer';
import ContactsScreen from './screens/ContactsScreen';
import EditProfile from './screens/EditProfile';
// const projectId = '10a413fd7ed28b8d4de56d6e9e8b63dd'

// SplashScreen.preventAutoHideAsync();



SplashScreen.hideAsync();
// 2. Create config
// const metadata = {
//   name: 'Web3Modal RN',
//   description: 'Web3Modal RN Example',
//   url: 'https://web3modal.com',
//   icons: ['https://avatars.githubusercontent.com/u/37784886'],
//   redirect: {
//     native: 'YOUR_APP_SCHEME://',
//     universal: 'YOUR_APP_UNIVERSAL_LINK.com'
//   }
// }

// const chains = [mainnet, polygon, arbitrum]

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// // 3. Create modal
// createWeb3Modal({
//   projectId,
//   chains,
//   wagmiConfig,
//   enableAnalytics: true // Optional - defaults to your Cloud configuration
// })
const Stack = createStackNavigator();

const App = () => {
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    const fetchProfileImg = async () => {
      try {
        const profileImg = await AsyncStorage.getItem('profileImg');
        setProfileImg(profileImg);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImg();
  }, []);

  return (
    <ThirdwebProvider
    activeChain={"polygon"}
    clientId={"7870cadedc26af733201b99959e5119e"}
  >
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreenPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={({ navigation }) => NavigationOptions({ navigation, profileImg })}
        />
        <Stack.Screen name="ForumPayConfirmationPage" component={ForumPayConfirmationPage} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="ForumPayPage" component={ForumPayPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="SignUpPageExt" component={SignupPageExt} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThirdwebProvider>
  );
};


export default App;
