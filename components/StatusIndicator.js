import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function StatusIndicator({online=false,label}){return <View style={styles.row}><View style={[styles.dot,online?styles.on:styles.off]}/><Text style={styles.text}>{label || (online?'Online':'Demo mode')}</Text></View>}
const styles=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',gap:7},dot:{width:8,height:8,borderRadius:4},on:{backgroundColor:'#34D399'},off:{backgroundColor:'#F59E0B'},text:{color:'#AAA1B2',fontSize:11,fontWeight:'600'}});
