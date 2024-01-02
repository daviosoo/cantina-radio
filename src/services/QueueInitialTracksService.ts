import TrackPlayer from 'react-native-track-player';

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add([
    {
      url: 'https://cloudoledgo.com:8008/stream', // Load media from the network
      title: 'La Cantina Radio',
      artist: 'La Cantina Radio',
      // isLiveStream: true,
      artwork:
        'https://i.scdn.co/image/ab67656300005f1f3f4a4310dfbf0d20bdd472a1',
    },
  ]);
};
