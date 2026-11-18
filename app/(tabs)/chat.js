import React,{useEffect,useRef,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MessageBubble from '../../components/MessageBubble';
import ChatInput from '../../components/ChatInput';
import TypingIndicator from '../../components/TypingIndicator';
import CustomButton from '../../components/CustomButton';
import { sendToAI } from '../../utils/ai';
import { loadConversations, saveConversations } from '../../utils/storage';
import { sampleConversations } from '../../data/sampleConversations';

const now=()=>new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
export default function Chat(){
 const params=useLocalSearchParams(); const listRef=useRef(null);
 const [messages,setMessages]=useState([]); const [loading,setLoading]=useState(false); const [source,setSource]=useState('');
 const [conversationId,setConversationId]=useState(null);
 useEffect(()=>{(async()=>{const saved=await loadConversations();const all=saved.length?saved:sampleConversations; if(params.id){const c=all.find(x=>x.id===params.id);if(c){setConversationId(c.id);setMessages(c.messages);return;}} if(params.prompt){setMessages([{id:'welcome',role:'assistant',text:`Sure. Let’s work on: ${params.prompt}`,time:now()}]);} else if(params.new){setMessages([]);} else {setMessages([]);}})();},[params.id,params.prompt,params.new]);
 useEffect(()=>{setTimeout(()=>listRef.current?.scrollToEnd({animated:true}),50)},[messages,loading]);
 const send=async(text)=>{const user={id:Date.now().toString(),role:'user',text,time:now()};const next=[...messages,user];setMessages(next);setLoading(true);const result=await sendToAI(text,messages);const ai={id:`ai-${Date.now()}`,role:'assistant',text:result.text,time:now()};const final=[...next,ai];setMessages(final);setSource(result.source);setLoading(false);
   const id=conversationId||`chat-${Date.now()}`;setConversationId(id);const saved=await loadConversations();const convo={id,title:text.slice(0,36)||'New conversation',updatedAt:new Date().toISOString(),messages:final};const filtered=saved.filter(x=>x.id!==id);await saveConversations([convo,...filtered].slice(0,30));
 };
 const newChat=()=>{setMessages([]);setSource('');setConversationId(null);router.setParams({new:'1',prompt:undefined,id:undefined});};
 return <View style={styles.screen}><View style={styles.header}><View><Text style={styles.title}>AI Chat</Text><Text style={styles.sub}>{source?`Source: ${source}`:'Ready for your next question'}</Text></View><CustomButton title="New" secondary onPress={newChat}/></View>
 {messages.length===0&&!loading?<View style={styles.empty}><Text style={styles.sparkle}>✦</Text><Text style={styles.emptyTitle}>Start a conversation</Text><Text style={styles.emptyText}>Ask NexaAI anything. Your conversations are saved locally on this device.</Text></View>:null}
 <FlatList ref={listRef} data={messages} keyExtractor={i=>i.id} renderItem={({item})=><MessageBubble message={item}/>} contentContainerStyle={{paddingVertical:10,paddingBottom:18}} keyboardShouldPersistTaps="handled" />
 {loading?<TypingIndicator/>:null}<ChatInput onSend={send} disabled={loading}/></View>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:'#090611',paddingTop:50},header:{paddingHorizontal:16,paddingBottom:12,borderBottomWidth:1,borderBottomColor:'#21172F',flexDirection:'row',alignItems:'center',justifyContent:'space-between'},title:{color:'#FFF',fontSize:21,fontWeight:'900'},sub:{color:'#81778F',fontSize:10,marginTop:3},empty:{flex:1,alignItems:'center',justifyContent:'center',padding:40},sparkle:{fontSize:38,color:'#A78BFA'},emptyTitle:{color:'#FFF',fontSize:18,fontWeight:'900',marginTop:12},emptyText:{color:'#8E8597',fontSize:12,lineHeight:18,textAlign:'center',marginTop:8}});
