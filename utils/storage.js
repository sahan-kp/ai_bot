
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@nexaai/history';
const PROFILE_KEY = '@nexaai/profile';

// Load conversations
export async function loadConversations() {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Could not load conversations', error);
    return [];
  }
}

// Save conversations
export async function saveConversations(conversations) {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(conversations));
}

// Clear conversations
export async function clearConversations() {
  await AsyncStorage.removeItem(HISTORY_KEY);
}

// Load student profile
export async function loadProfile() {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Could not load profile', error);
    return null;
  }
}

// Save student profile
export async function saveProfile(profile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// Reset student profile
export async function clearProfile() {
  await AsyncStorage.removeItem(PROFILE_KEY);
}
