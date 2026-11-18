import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PromptCard({ item, onPress }) {
  return <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.icon}><Ionicons name={item.icon} size={20} color="#C4B5FD" /></View>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.prompt} numberOfLines={2}>{item.prompt}</Text>
  </TouchableOpacity>;
}
const styles=StyleSheet.create({
 card:{width:165,minHeight:132,backgroundColor:'#120D20',borderWidth:1,borderColor:'#2A1C3D',borderRadius:20,padding:14,marginRight:10},
 icon:{width:36,height:36,borderRadius:12,backgroundColor:'#24163B',alignItems:'center',justifyContent:'center',marginBottom:10},
 title:{color:'#FFF',fontSize:14,fontWeight:'800'},prompt:{color:'#8F879F',fontSize:11,lineHeight:16,marginTop:6}
});
