import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token,name,id,profileImg) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('id', id.toString());
    
    await AsyncStorage.setItem('profileImg', profileImg);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const auth = (navigation, username, password) => {

  // Construct the request body
  const requestBody = {
    username: username,
    password: password
  };

  // Make the API call to get the token
  fetch('https://app.apexcardservice.com/loginUser.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Ensure that the response contains the 'token' property
    if (data && data.token) {
      const tokenid = data.token;
      const name = data.fullName;
      const id=data.id;
      const profileImg=data.imagUrl;
      console.log(data);
      storeToken(tokenid,name,id,profileImg);
      // Navigate to Home screen upon successful login
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      });
    } else {
      console.error('Error: Invalid response format');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error or display error message
  });
};

export default auth;
