import React,{useCallback,useState} from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import ConversationCard from '../../components/ConversationCard';
import EmptyState from '../../components/EmptyState';
import { loadConversations, saveConversations, clearConversations } from '../../utils/storage';
import { sampleConversations } from '../../data/sampleConversations';

export default function History(){
 const [items,setItems]=useState([]);
 const refresh=useCallback(()=>{(async()=>{const saved=await loadConversations();setItems(saved.length?saved:sampleConversations)})();},[]);
 useFocusEffect(refresh);
 const remove=async(id)=>{const next=items.filter(x=>x.id!==id);setItems(next);await saveConversations(next);};
 const clear=()=>Alert.alert('Clear history','Delete all saved conversations?', [{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:async()=>{await clearConversations();setItems([])}}]);
 return <View style={styles.screen}><View style={styles.header}><View><Text style={styles.title}>Chat History</Text><Text style={styles.sub}>Your conversations on this device</Text></View><Text style={styles.clear} onPress={clear}>Clear all</Text></View>
 {items.length?<FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=><ConversationCard item={item} onPress={()=>router.push({pathname:'/(tabs)/chat',params:{id:item.id}})} onDelete={()=>remove(item.id)} />} contentContainerStyle={styles.list}/>:<EmptyState title="No conversations yet" description="Start a new chat and your conversation will appear here."/>}</View>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:'#090611',paddingTop:52},header:{padding:20,borderBottomWidth:1,borderBottomColor:'#21172F',flexDirection:'row',justifyContent:'space-between',alignItems:'center'},title:{color:'#FFF',fontSize:22,fontWeight:'900'},sub:{color:'#81778F',fontSize:10,marginTop:3},clear:{color:'#F87171',fontSize:11,fontWeight:'800'},list:{padding:16,paddingBottom:100}});
