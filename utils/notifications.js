import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function initializeNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('nexa-default', {
      name: 'NexaAI Notifications',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8B5CF6',
    });
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

export async function getNotificationStatus() {
  const result = await Notifications.getPermissionsAsync();
  return result.granted ? 'Granted' : 'Not granted';
}

export async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('nexa-default', {
      name: 'NexaAI Notifications',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

export async function scheduleTestNotification(delaySeconds = 5) {
  const granted = await requestNotificationPermission();
  if (!granted) throw new Error('Notification permission was not granted.');

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'NexaAI is ready',
      body: 'This is your scheduled local notification test.',
      data: { screen: '/(tabs)/settings' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delaySeconds,
    },
  });
}
