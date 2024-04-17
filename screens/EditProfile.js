import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageBackgroundComponent from '../components/ImageBackgroundComponent';
import styles from '../assets/styles';
import ProfileImgFetch from '../api/profileImgFetch';
import * as ImagePicker from 'expo-image-picker';


const EditProfile = ({ navigation, }) => {
  const [id,setId]=useState('');
  const [profileImg,setProfileImg]=useState('');
  const fetchId = async () => {
    const idParent = await AsyncStorage.getItem('id');
    await ProfileImgFetch(idParent);
    
    
    console.log("profileImg Called");
    setId(idParent);
    
fetchImage();
  };
 
  
  const fetchImage = async () => {
    try {
      const profileImg = await AsyncStorage.getItem('profileImg');
      setProfileImg(profileImg);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };
  useEffect(()=>{
    
fetchId();

  },[imageUri]);
console.log(id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [imageUri, setImageUri] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const selectImage = async (source) => {
    
    let permissionResult;
    if (source === 'camera') {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult;
    if (source === 'camera') {
      pickerResult = await ImagePicker.launchCameraAsync();
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync();
    }

    if (pickerResult.cancelled === true) {
      closeModal();
      return;
    }

    setImageUri(pickerResult.assets['0'].uri);
    console.log(pickerResult.assets['0'].uri);
    closeModal();
  };
  const handleEdit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validate email format, full name, and phone number
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }
    if (!fullName) {
      Alert.alert('Please enter your full name.');
      return;
    }
    if (!phoneNo) {
      Alert.alert('Please enter your phone number.');
      return;
    }
  
    // Check if an image is selected
    if (!imageUri) {
      Alert.alert('Please select an image.');
      return;
    }
  
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    // Create object with all the data except the image
    const userData = {
      id: id,
      fullName: fullName,
      email: email,
      phoneNo: phoneNo,
    };
  
    try {
      // Make POST request to update user data (excluding image)
      const response = await fetch('https://app.apexcardservice.com/editUser.php', {
        method: 'POST',
        body: JSON.stringify(userData), // Convert object to JSON string
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data); // Handle response from server
  
      // If user data is successfully updated, proceed to update the profile image
      if (response.ok) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', {
          uri: imageUri,
          name: filename,
          type: 'image/jpg',
        });
  
        console.log('FormData:', formData);
        // Make separate POST request to update profile image
        const imageResponse = await fetch('https://app.apexcardservice.com/updateProfileImage.php', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
  
        console.log('Image Response:', imageResponse);
  
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          fetchId();
          navigation.pop();
        } else {
          console.error('Image Update Request Failed:', imageResponse.statusText);
        }
      } else {
        console.error('Profile Update Request Failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred while updating data. Please try again.');
    }
  };
  

  return (
    <ImageBackgroundComponent>
      {/* <TransparentNavbar title={'Sign Up'}  /> */}
      <View style={styles.container}>
        <View style={styles.formContainer}>
      {/* <Button title="Select Image" onPress={selectImage} /> */}
      <TouchableOpacity onPress={openModal}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  {imageUri ? (
    <Image
      source={{ uri: imageUri }}
      style={{ width: 50, height: 50, borderRadius: 50, marginTop: 20, marginBottom: 60 }}
    />
  ) : profileImg ? (
    <Image
      source={{ uri: profileImg }}
      style={{ width: 50, height: 50, borderRadius: 50, marginTop: 20, marginBottom: 60 }}
    />
  ) : (
    <Image
      source={require('../assets/avatar.jpg')}
      style={{ width: 50, height: 50, borderRadius: 50, marginTop: 20, marginBottom: 60 }}
    />
  )}
  <Text>Tap on image to change</Text>
</View>

</TouchableOpacity>

        {/* <View style={styles.imageCenter}>
                    <Image
                        source={ require('../assets/bgCashApp.jpg') } // Replace with your image URL
                        style={styles.image}
                    />
                    </View> */}
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
          <Text style={styles.label}>Phone No:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => setPhoneNo(text)}
          />
          <Button
            title="Edit Profile"
            onPress={handleEdit}
          />
        </View>
      </View>
      <Modal visible={showModal} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={[styles.modalContent]}>
      <Button style={{margin:40}} title="Choose from Gallery" onPress={() => selectImage('gallery')} />
      <Button style={{margin:40}} title="Take Photo" onPress={() => selectImage('camera')} />
      <Button style={{margin:40}} title="Cancel" onPress={closeModal} />
    </View>
  </View>
</Modal>

    </ImageBackgroundComponent>
  );
};

export default EditProfile;
