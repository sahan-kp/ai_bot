import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatInput({ onSend, disabled }) {
  const [text,setText]=useState('');
  const submit=()=>{const value=text.trim(); if(!value||disabled)return; onSend(value);setText('');Keyboard.dismiss();};
  return <View style={styles.wrap}>
    <TextInput value={text} onChangeText={setText} editable={!disabled} placeholder="Ask NexaAI anything..." placeholderTextColor="#71687F" style={styles.input} multiline maxLength={4000} onSubmitEditing={submit} />
    <TouchableOpacity style={[styles.send,(!text.trim()||disabled)&&styles.disabled]} onPress={submit} disabled={!text.trim()||disabled}><Ionicons name="arrow-up" size={20} color="#FFF"/></TouchableOpacity>
  </View>;
}
const styles=StyleSheet.create({
 wrap:{flexDirection:'row',alignItems:'flex-end',gap:8,padding:10,backgroundColor:'#0C0818',borderTopWidth:1,borderTopColor:'#21172F'},
 input:{flex:1,minHeight:48,maxHeight:120,borderRadius:17,backgroundColor:'#171021',borderWidth:1,borderColor:'#332447',color:'#FFF',paddingHorizontal:15,paddingTop:13,paddingBottom:12,fontSize:14},
 send:{width:46,height:46,borderRadius:16,backgroundColor:'#7C3AED',alignItems:'center',justifyContent:'center'},disabled:{opacity:.35}
});
