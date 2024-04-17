import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View,Image } from 'react-native';
const logout=async(navigation)=>{
  try {

    // Filter out keys that you want to exclude from removal
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('profileImg');

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginPage' }],
    });
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
  }
 
  
const NavigationOptions = ({ navigation,profileImg }) => ({
    headerTransparent: true,
    headerShown: true,
    headerTitle: 'Apex NFT Pay',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row' , margin:5}}>
  <Ionicons 
    name="log-out" 
    size={24} 
    color="#fff" 
    style={{ marginRight: 15 }}
    onPress={() => logout(navigation)}
  />
{
  profileImg ?
  <TouchableOpacity  onPress={() => {
      navigation.navigate('EditProfile');
    }}>
  <Image
      source={{ uri: profileImg }}
      style={{ width: 35, height: 35, borderRadius: 50 }}
    />
    </TouchableOpacity>
    :
    <Ionicons 
    name="person-circle" 
    size={24} 
    color="#fff" 
    onPress={() => {
      navigation.navigate('EditProfile');
    }}
  />
}
  
</View>

    )
  });
  export default NavigationOptions;