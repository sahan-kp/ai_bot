import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ message }) {
  const user = message.role === 'user';
  return <View style={[styles.wrap, user ? styles.right : styles.left]}>
    <View style={[styles.bubble, user ? styles.user : styles.ai]}>
      <Text style={styles.text}>{message.text}</Text>
      <Text style={styles.time}>{message.time || ''}</Text>
    </View>
  </View>;
}
const styles=StyleSheet.create({
 wrap:{width:'100%',marginVertical:6,paddingHorizontal:14},right:{alignItems:'flex-end'},left:{alignItems:'flex-start'},
 bubble:{maxWidth:'88%',borderRadius:18,paddingHorizontal:15,paddingVertical:11},user:{backgroundColor:'#6334A8',borderBottomRightRadius:5},ai:{backgroundColor:'#171122',borderWidth:1,borderColor:'#2D2040',borderBottomLeftRadius:5},
 text:{color:'#F7F5FA',fontSize:14,lineHeight:21},time:{color:'#A99FB8',fontSize:9,marginTop:6}
});
