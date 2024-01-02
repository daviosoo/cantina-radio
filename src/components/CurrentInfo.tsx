import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const CurrentInfo = () => {
  const [songData, setSongData] = useState<{
    connections: string;
    nowplaying: string;
  } | null>(null);

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
  }, [songData]);

  if (!songData) {
    return (
      <View style={styles.loadingSongContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.listeners}>{songData.connections} Oyentes</Text>

      <Text style={styles.songName}>{songData.nowplaying.split(' - ')[0]}</Text>
      <Text style={styles.songArtist}>
        {songData.nowplaying.split(' - ')[1]}
      </Text>
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
});

export default CurrentInfo;
