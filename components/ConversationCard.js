import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConversationCard({ item, onPress, onDelete }) {
  return <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.icon}><Ionicons name="chatbubble-outline" size={18} color="#C4B5FD"/></View>
    <View style={{flex:1}}>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.preview} numberOfLines={1}>{item.messages?.[item.messages.length-1]?.text || 'No messages'}</Text>
      <Text style={styles.time}>{new Date(item.updatedAt).toLocaleString()}</Text>
    </View>
    <TouchableOpacity onPress={onDelete} hitSlop={10}><Ionicons name="trash-outline" size={18} color="#8B7F96"/></TouchableOpacity>
  </TouchableOpacity>;
}
const styles=StyleSheet.create({card:{flexDirection:'row',alignItems:'center',gap:12,padding:14,borderRadius:18,backgroundColor:'#120D20',borderWidth:1,borderColor:'#2A1C3D',marginBottom:10},icon:{width:38,height:38,borderRadius:13,backgroundColor:'#24163B',alignItems:'center',justifyContent:'center'},title:{color:'#FFF',fontWeight:'800',fontSize:14},preview:{color:'#91889E',fontSize:11,marginTop:4},time:{color:'#665D70',fontSize:9,marginTop:6}});
