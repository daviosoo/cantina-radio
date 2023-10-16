import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Linking,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer, {Capability} from 'react-native-track-player';

import Icon from 'react-native-vector-icons/FontAwesome';
import {SetupService} from './src/services/SetUpService';

function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

const ButtonMain = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const isPlayerReady = useSetupPlayer();

  const handlePressPlay = async () => {
    await TrackPlayer.setupPlayer();

    TrackPlayer.play();
    setIsPlaying(true);
  };

  const handlePressStop = () => {
    setIsPlaying(false);
    TrackPlayer.pause();
  };

  if (!isPlayerReady) {
    return (
      <TouchableOpacity style={styles.playButton} disabled={true}>
        <ActivityIndicator size="small" color="#000" />
      </TouchableOpacity>
    );
  }

  if (isPlaying) {
    return (
      <TouchableOpacity
        style={styles.playButton}
        activeOpacity={0.9}
        onPress={handlePressStop}>
        <Icon name="stop" size={25} color="#000" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.playButton}
      activeOpacity={0.9}
      onPress={handlePressPlay}>
      <Icon name="play" size={25} color="#000" style={styles.playButtonIcon} />
    </TouchableOpacity>
  );
};

const Link = ({url, iconName}) => {
  const onPressLink = uri => {
    Linking.openURL(uri);
  };

  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => onPressLink(url)}>
      <Icon name={iconName} size={40} color="white" />
    </TouchableOpacity>
  );
};

const LinksBar = ({links}) => {
  return (
    <View style={styles.linksContainer}>
      {links.map(link => {
        return (
          <Link key={link.iconName} url={link.url} iconName={link.iconName} />
        );
      })}
    </View>
  );
};

const CurrentInfo = () => {
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    setInterval(() => {
      fetch(
        'https://cloudoledgo.com:2000/AudioPlayer/lacantinadesergiozapata/playerInfo',
      )
        .then(response => response.json())
        .then(actualData => setSongData(actualData));
    }, 5000);
  }, []);

  useEffect(() => {
    if (!songData) {
      return;
    }
    SplashScreen.hide();
  }, [songData]);

  if (!songData) {
    return (
      <View style={styles.loadingSongContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.songContainer}>
      <Text style={styles.listeners}>{songData.connections} Oyentes</Text>

      <Text style={styles.songName}>{songData.nowplaying.split(' - ')[0]}</Text>
      <Text style={styles.songArtist}>
        {songData.nowplaying.split(' - ')[1]}
      </Text>
    </View>
  );
};

const App = () => {
  const links = [
    {
      iconName: 'external-link',
      url: 'https://www.lacantinadesergiozapata.com/',
    },
    {
      iconName: 'facebook-square',
      url: 'https://www.facebook.com/LaCantinaDeSergioZapata',
    },

    {
      iconName: 'instagram',
      url: 'https://www.instagram.com/sergiozapatamanager/',
    },
    {
      iconName: 'spotify',
      url: 'https://open.spotify.com/show/0UVoyeRNXKYzFHdHJ1Bfbf?si=ff325f0de6a54d66',
    },
    {
      iconName: 'youtube',
      url: 'https://www.youtube.com/@LACANTINADESERGIOZAPATA',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <ImageBackground
        source={require('./background.png')} // Add your background image
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
            <ButtonMain />
            <LinksBar links={links} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSongContainer: {marginBottom: 20},
  songName: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  songArtist: {
    color: '#ddd',
    fontSize: 18,
    textAlign: 'center',
  },

  listeners: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },

  linksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  playButton: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 65,
    backgroundColor: 'white',
    marginBottom: 20,
    marginTop: 20,
  },
  webLink: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  playButtonIcon: {
    marginLeft: 5,
  },
  linkButton: {
    marginTop: 20,
  },
  webText: {
    color: 'black', // Customize the text color
    fontSize: 18,
  },
});

export default App;
