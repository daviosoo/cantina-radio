import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const RadioApp = () => {
  const handlePlayPress = () => {
    // Handle play button logic here (e.g., start streaming the radio station).
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./background.jpg')} // Add your background image
        //source={require('./1.jpeg')} // Add your background image
        style={styles.backgroundImage}>
        <View style={styles.overlayContainer}>
          <LinearGradient
            start={{x: 0, y: 0.85}}
            end={{x: 0, y: 0}}
            colors={['rgba(0,0,0,1)', 'transparent']} // Define your gradient colors
            style={styles.overlay}
          />
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPress}>
              <Text style={styles.playButtonText}>PLAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>INFO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 60,
  },
  playButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
  },
  playButtonText: {
    color: 'black', // Customize the text color
    fontWeight: 'bold',
    fontSize: 20,
  },
  infoButton: {
    marginTop: 20,
  },
  infoButtonText: {
    color: 'white', // Customize the text color
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default RadioApp;
