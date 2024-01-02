import React from 'react';
import {View, ImageBackground, StyleSheet, StatusBar} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import PlayPause from './src/components/PlayPause';
import Links from './src/components/Links';
import CurrentInfo from './src/components/CurrentInfo';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <ImageBackground
        source={require('./src/assets/background.png')} // Add your background image
        style={styles.backgroundImage}>
        <View style={styles.overlayContainer}>
          <LinearGradient
            start={{x: 0, y: 0.85}}
            end={{x: 0, y: 0}}
            colors={['rgba(0,0,0,1)', 'transparent']} // Define your gradient colors
            style={styles.overlay}
          />
          <View style={styles.content}>
            <CurrentInfo />
            <PlayPause />
            <Links />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});

export default App;
