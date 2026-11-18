import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomButton({ title, onPress, icon, secondary=false, loading=false }) {
  const content = loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.text}>{icon ? `${icon}  ` : ''}{title}</Text>;
  if (secondary) return <TouchableOpacity onPress={onPress} style={styles.secondary}>{content}</TouchableOpacity>;
  return <TouchableOpacity onPress={onPress} activeOpacity={0.82}><LinearGradient colors={['#7C3AED','#A855F7']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.primary}>{content}</LinearGradient></TouchableOpacity>;
}
const styles=StyleSheet.create({
 primary:{minHeight:50,borderRadius:16,alignItems:'center',justifyContent:'center',paddingHorizontal:18,shadowOpacity:.25,shadowRadius:12},
 secondary:{minHeight:48,borderRadius:15,alignItems:'center',justifyContent:'center',paddingHorizontal:18,borderWidth:1,borderColor:'#35264E',backgroundColor:'#151021'},
 text:{color:'#FFF',fontSize:14,fontWeight:'800'}
});
