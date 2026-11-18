import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function TypingIndicator(){return <View style={styles.wrap}><View style={styles.dot}/><View style={styles.dot}/><View style={styles.dot}/><Text style={styles.text}>NexaAI is thinking...</Text></View>}
const styles=StyleSheet.create({wrap:{flexDirection:'row',alignItems:'center',gap:5,padding:12,marginLeft:14},dot:{width:6,height:6,borderRadius:3,backgroundColor:'#A78BFA'},text:{color:'#8F879F',fontSize:11,marginLeft:5}});
