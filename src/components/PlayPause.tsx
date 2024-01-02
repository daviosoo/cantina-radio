import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SetupService} from '../services/SetupService';
import {QueueInitialTracksService} from '../services/QueueInitialTracksService';

const PlayPause = () => {
  const {playing, bufferingDuringPlay} = useIsPlaying();
  const isPlayerReady = useSetupPlayer();

  useEffect(() => {
    function deepLinkHandler(data: {url: string}) {
      console.log('deepLinkHandler', data.url);
    }

    // This event will be fired when the app is already open and the notification is clicked
    const subscription = Linking.addEventListener('url', deepLinkHandler);

    // When you launch the closed app from the notification or any other link
    Linking.getInitialURL().then(url => console.log('getInitialURL', url));

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isPlayerReady || bufferingDuringPlay) {
    return (
      <TouchableOpacity style={styles.playButton} disabled={true}>
        <ActivityIndicator size="small" color="#000" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.playButton}
      activeOpacity={0.9}
      onPress={playing ? TrackPlayer.stop : TrackPlayer.play}>
      <Icon
        name={playing ? 'stop' : 'play'}
        size={25}
        color="#000"
        style={!playing ? styles.playButtonIcon : {}}
      />
    </TouchableOpacity>
  );
};

async function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) {
        return;
      }
      setPlayerReady(true);
      await QueueInitialTracksService();
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

const styles = StyleSheet.create({
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
  playButtonIcon: {
    marginLeft: 5,
  },
});

export default PlayPause;
