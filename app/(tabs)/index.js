
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useCallback } from 'react';

import AppHeader from '../../components/AppHeader';
import CustomButton from '../../components/CustomButton';
import PromptCard from '../../components/PromptCard';
import StatusIndicator from '../../components/StatusIndicator';

import { profile as defaultProfile } from '../../data/profile';
import { samplePrompts } from '../../data/samplePrompts';
import { sampleConversations } from '../../data/sampleConversations';
import { loadProfile } from '../../utils/storage';

export default function Home() {
  const [studentProfile, setStudentProfile] = useState(defaultProfile);
  const { width } = useWindowDimensions();

  // Reload profile whenever Home screen becomes active
  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function getProfile() {
        try {
          const savedProfile = await loadProfile();

          if (active && savedProfile) {
            setStudentProfile(savedProfile);
          }
        } catch (error) {
          console.warn('Could not load student profile:', error);
        }
      }

      getProfile();

      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingHorizontal: width < 380 ? 14 : 20 }
      ]}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader
        title="NexaAI"
        subtitle="Your smart AI companion"
      />

      <LinearGradient
        colors={['#241044', '#130C21']}
        style={styles.hero}
      >
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={14} color="#C4B5FD" />
          <Text style={styles.badgeText}>
            INTELLIGENT ASSISTANT
          </Text>
        </View>

        <Text style={styles.welcome}>
          Welcome back 👋
        </Text>

        <Text style={styles.name} numberOfLines={2}>
          {studentProfile.name || 'Student'}
        </Text>

        <Text style={styles.desc}>
          Ask questions, learn faster, build ideas, and create
          better content with NexaAI.
        </Text>

        <CustomButton
          title="Start New Chat"
          icon="✦"
          onPress={() => router.push('/(tabs)/chat?new=1')}
        />
      </LinearGradient>

      <View style={styles.status}>
        <StatusIndicator label="AI assistant ready • Offline fallback enabled" />
      </View>

      <Text style={styles.section}>
        Quick prompts
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promptList}
      >
        {samplePrompts.map(item => (
          <PromptCard
            key={item.id}
            item={item}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/chat',
                params: { prompt: item.prompt }
              })
            }
          />
        ))}
      </ScrollView>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>
          Recent activity
        </Text>

        <Text
          style={styles.link}
          onPress={() => router.push('/(tabs)/history')}
        >
          View all
        </Text>
      </View>

      {sampleConversations.map(c => (
        <View key={c.id} style={styles.recent}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={18}
            color="#A78BFA"
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.rtitle}>
              {c.title}
            </Text>

            <Text style={styles.preview} numberOfLines={1}>
              {c.messages[c.messages.length - 1].text}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
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

  hero: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#3A235B',
    width: '100%'
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap'
  },

  badgeText: {
    color: '#B8A8D2',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1
  },

  welcome: {
    color: '#C9BED6',
    fontSize: 15,
    marginTop: 20
  },

  name: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 4
  },

  desc: {
    color: '#A49AAD',
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 14
  },

  status: {
    paddingVertical: 14
  },

  section: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12
  },

  promptList: {
    paddingRight: 10,
    gap: 10
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22
  },

  link: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '800'
  },

  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: '#120D20',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A1C3D',
    marginBottom: 9,
    width: '100%'
  },

  rtitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13
  },

  preview: {
    color: '#8D8499',
    fontSize: 11,
    marginTop: 4
  }
});
