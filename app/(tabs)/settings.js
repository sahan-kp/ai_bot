
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { useAppState } from '../../hooks/useAppState';
import { profile as defaultProfile } from '../../data/profile';
import { loadProfile, saveProfile } from '../../utils/storage';
import AppHeader from '../../components/AppHeader';

export default function Settings() {
  const appState = useAppState();
  const { width } = useWindowDimensions();

  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const saved = await loadProfile();
        if (saved) setProfile(saved);
      } catch (error) {
        Alert.alert('Error', 'Could not load profile.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const updateField = (key, value) => {
    setProfile(previous => ({
      ...previous,
      [key]: value
    }));
  };

  const handleSave = async () => {
    if (!profile.name.trim() || !profile.studentId.trim() ||
        !profile.university.trim() || !profile.module.trim()) {
      Alert.alert('Missing Details', 'Please fill in all student details.');
      return;
    }

    setSaving(true);
    try {
      await saveProfile(profile);
      setEditing(false);
      Alert.alert('Success', 'Student profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Unable to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    const saved = await loadProfile();
    setProfile(saved || defaultProfile);
    setEditing(false);
  };

  const field = (label, key, placeholder) => (
    <View style={styles.field} key={key}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={profile[key] || ''}
        onChangeText={value => updateField(key, value)}
        placeholder={placeholder}
        placeholderTextColor="#71677E"
        style={[styles.input, !editing && styles.readOnlyInput]}
        editable={editing}
        autoCapitalize="words"
        returnKeyType="next"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#A78BFA" />
        <Text style={styles.note}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: width < 380 ? 14 : 20 }
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          title="Settings"
          subtitle="Personalize your NexaAI experience"
          icon="settings-outline"
        />

        <View style={styles.card}>
          <View style={styles.headingRow}>
            <Text style={styles.cardTitle}>Student Profile</Text>
            <Text style={styles.profileIcon}>👤</Text>
          </View>

          {field('Student Name', 'name', 'Enter your full name')}
          {field('Student ID', 'studentId', 'Enter your student ID')}
          {field('University', 'university', 'Enter university name')}
          {field('Module', 'module', 'Enter module name')}

          {editing ? (
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                disabled={saving}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveText}>Save Changes</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.saveText}>Edit Profile</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Application Information</Text>
          <Info label="App Name" value="NexaAI – Smart AI Chatbot" />
          <Info label="Version" value={profile.appVersion || '1.0.0'} />
          <Info label="Current App State" value={appState || 'Unknown'} />
          <Info label="AI Service" value="Gemini AI" />
          <Info label="Backend" value="Connected configuration" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About NexaAI</Text>
          <Text style={styles.note}>
            NexaAI is a university-focused AI assistant featuring
            Gemini integration, chat history, profile management
            and mobile-friendly navigation.
          </Text>
        </View>

        <Text style={styles.footer}>NexaAI v1.0.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.info}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#090611'
  },
  content: {
    paddingTop: 35,
    paddingBottom: 40,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 600
  },
  loading: {
    flex: 1,
    backgroundColor: '#090611',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#120D20',
    borderWidth: 1,
    borderColor: '#2A1C3D',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    width: '100%'
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 14
  },
  profileIcon: {
    fontSize: 20
  },
  field: {
    marginBottom: 13,
    width: '100%'
  },
  label: {
    color: '#A99DB8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6
  },
  input: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#49365F',
    backgroundColor: '#0E0A17',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    width: '100%'
  },
  readOnlyInput: {
    borderColor: '#312242',
    color: '#D8D0E2'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8
  },
  button: {
    minHeight: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    flex: 1
  },
  saveButton: {
    backgroundColor: '#7C3AED'
  },
  cancelButton: {
    backgroundColor: '#241A31',
    borderWidth: 1,
    borderColor: '#49365F'
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13
  },
  cancelText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13
  },
  info: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#241A31'
  },
  value: {
    color: '#E9E4EF',
    fontSize: 13
  },
  note: {
    color: '#B0A5BD',
    fontSize: 12,
    lineHeight: 19
  },
  footer: {
    textAlign: 'center',
    color: '#71677E',
    fontSize: 11,
    paddingVertical: 12
  }
});
