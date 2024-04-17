import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const ImageBackgroundComponent = ({children }) => {
  return (
    <ImageBackground
       source={require('../assets/appBg.png')}
        style={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ImageBackgroundComponent;
