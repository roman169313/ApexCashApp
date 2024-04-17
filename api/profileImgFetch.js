import AsyncStorage from "@react-native-async-storage/async-storage";

const storeImg = async (profileImg) => {
  try {
    
    await AsyncStorage.setItem('profileImg', profileImg);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const ProfileImgFetch =async (id) => {

  // Construct the request body
  const requestBody = {
    id: id
  };

  // Make the API call to get the token
  fetch('https://app.apexcardservice.com/getProfileImg.php', {
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
    if (data) {
     
      const profileImg=(data.imagUrl);
      storeImg(profileImg);
      return;
    } else {
      console.error('Error: Invalid response format');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error or display error message
  });
};

export default ProfileImgFetch;
