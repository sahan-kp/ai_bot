import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppState, LogBox } from 'react-native';
import { initializeNotifications } from '../utils/notifications';

LogBox.ignoreLogs(['Require cycle:']);

export default function RootLayout() {
  useEffect(() => {
    initializeNotifications();
    const subscription = AppState.addEventListener('change', state => {
      console.log(`[NexaAI] AppState changed: ${state}`);
    });
    return () => subscription.remove();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </>
  );
}
