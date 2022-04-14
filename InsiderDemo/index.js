/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import RNInsider from 'react-native-insider';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
});

async function DisplayNotification(remoteMessage) {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    },
  });
}

messaging().onMessage(async remoteMessage => {
  console.log('Message handled: ', remoteMessage);
  if (remoteMessage.data.source === 'Insider') {
    RNInsider.handleNotification(remoteMessage.data);
    return
  } else {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    DisplayNotification(remoteMessage);
  }
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  if (remoteMessage.data.source === "Insider") {
    RNInsider.handleNotification(remoteMessage.data);
    return
  }
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent('app', () => HeadlessCheck);
AppRegistry.registerComponent(appName, () => App);
