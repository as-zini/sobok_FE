import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const useNotification = () => {

  // src/push/fcm.js
  async function requestNotificationPermission() {
  try {
    const status = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      provisional: false, // 조용한 권한을 원하면 true
      sound: true,
    });

    const AUTHORIZED = messaging.AuthorizationStatus.AUTHORIZED;
    const PROVISIONAL = messaging.AuthorizationStatus.PROVISIONAL;

    return status === AUTHORIZED || status === PROVISIONAL;
  } catch (e) {
    console.warn('requestPermission failed:', e);
    return false;
  }
}

  async function getFcmToken() {
  try {
    if (Platform.OS === 'ios') {
      try {
        await messaging().registerDeviceForRemoteMessages();
      } catch (e) {
        console.warn('registerDeviceForRemoteMessages failed:', e);
      }
    }
    const token = await messaging().getToken();
    return token || null;
  } catch (e) {
    console.warn('getToken failed:', e);
    return null;
  }
}

function watchTokenRefresh(onNewToken) {
  return messaging().onTokenRefresh(onNewToken);
}

async function sendTokenToBack(token){
  try {
    const response = await baseUrl.post(`/fcm/register?fcmToken=${token}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

  return {
    requestNotificationPermission,
    getFcmToken,
    watchTokenRefresh,
     sendTokenToBack
  }
}
