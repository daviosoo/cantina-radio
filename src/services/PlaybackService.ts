import TrackPlayer, {Event} from 'react-native-track-player';
import BootSplash from 'react-native-bootsplash';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemoteStop');
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    console.log('Event.PlaybackState', event);

    if (event.state === 'ready') {
      BootSplash.isVisible().then(async isVisible => {
        if (isVisible) {
          await BootSplash.hide({fade: true});
        }
      });
    }
  });
}
