import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const WelcomePage = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const slides = [
    {
      title: 'Streamlining Online Payment process',
      description: 'Lorem ipsumLorem ipsumLorem ipsum',
    },
    {
      title: 'Safe & Reliable Anywhere , Anytime',
      description: 'Swipe through to learn more about our app features.',
    },
    {
      title: 'Let\'s Manage your Financials Now',
      description: 'Tap on the button below to start using the app.',
    },
  ];

  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Navigate to the main screen or any other screen
     
      navigation.navigate('LoginPage');
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        onScroll={(event) => {
          const slideIndex = Math.ceil(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
          setCurrentPage(slideIndex);
        }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentPage ? styles.activeDot : null]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{currentPage === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
      {currentPage > 0 && (
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prevButton: {
    marginTop: 10,
  },
});

export default WelcomePage;
