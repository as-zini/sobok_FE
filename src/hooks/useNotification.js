import { getMessaging, getToken } from "firebase/messaging";


export const useNotification = () => {
  const messaging = getMessaging();

  const requestPermission = async() => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
            vapidKey: "YOUR_PUBLIC_VAPID_KEY",
        });
        console.log("FCM Token:", fcmToken);
        return fcmToken;
    } else {
        console.log("Permission denied");
        return null;
    }
}

  return {

  }
}
