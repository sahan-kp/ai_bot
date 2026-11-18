import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const icon = (name, color) => ({ color, size: 22, name });

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C4B5FD',
        tabBarInactiveTintColor: '#7B748C',
        tabBarStyle: {
          backgroundColor: '#0C0818',
          borderTopColor: '#241A36',
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color,size}) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({color,size}) => <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: ({color,size}) => <Ionicons name="time-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({color,size}) => <Ionicons name="settings-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
