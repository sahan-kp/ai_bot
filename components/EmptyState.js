import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function EmptyState({title,description}){return <View style={styles.box}><View style={styles.icon}><Ionicons name="sparkles-outline" size={28} color="#C4B5FD"/></View><Text style={styles.title}>{title}</Text><Text style={styles.desc}>{description}</Text></View>}
const styles=StyleSheet.create({box:{alignItems:'center',justifyContent:'center',padding:35},icon:{width:64,height:64,borderRadius:22,backgroundColor:'#24163B',alignItems:'center',justifyContent:'center'},title:{color:'#FFF',fontWeight:'800',fontSize:16,marginTop:15},desc:{color:'#8D8499',fontSize:12,lineHeight:18,textAlign:'center',marginTop:7}});
