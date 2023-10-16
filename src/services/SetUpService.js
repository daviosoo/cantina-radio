import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

const setupPlayer = async options => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return error.code;
    }
  };
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise(resolve => setTimeout(resolve, 1));
  }
};

export const SetupService = async () => {
  await setupPlayer({
    autoHandleInterruptions: true,
  });
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
    },
    // This flag is now deprecated. Please use the above to define playback mode.
    // stoppingAppPausesPlayback: true,
    capabilities: [Capability.Play, Capability.Pause],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  var track1 = {
    url: 'https://cloudoledgo.com:8008/stream', // Load media from the network
    title: 'La Cantina Radio',
    artist: 'La Cantina Radio',
    isLiveStream: true,
  };

  await TrackPlayer.add([track1]);
};
