import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppHeader({ title = 'NexaAI', subtitle, icon = 'sparkles' }) {
  return (
    <View style={styles.row}>
      <View style={styles.logo}><Ionicons name={icon} size={22} color="#EDE9FE" /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:20},
  logo:{width:44,height:44,borderRadius:15,backgroundColor:'#2A1B45',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#4B2E78'},
  title:{color:'#FFF',fontSize:22,fontWeight:'800'},
  subtitle:{color:'#9189A4',fontSize:12,marginTop:3}
});
