import React,{useState} from 'react';
import { Alert } from 'react-native';
import CustomButton from './CustomButton';
import { scheduleTestNotification } from '../utils/notifications';
export default function NotificationButton(){const [loading,setLoading]=useState(false);const test=async()=>{try{setLoading(true);await scheduleTestNotification(5);Alert.alert('Notification scheduled','A local notification will appear in about 5 seconds.');}catch(e){Alert.alert('Notification error',e.message);}finally{setLoading(false);}};return <CustomButton title="Test Notification (5s)" onPress={test} loading={loading}/>;}
