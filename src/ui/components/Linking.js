// openApp.js
import { Linking, Alert } from 'react-native';

const linkAppList = [
  "스픽", "말해보카", "Duolingo", "산타", "Cake", "야나두", "Netflix", "YouTube",
  "교보eBook", "예스24 eBook", "밀리의서재", "윌라", "Class101", "Udemy", "Notion",
  "Goodnotes", "HelloLMS", "LearninX student", "메가스터디 스마트러닝", "대성마이맥 Player",
  "이투스 수강앱-Smart Study", "Planfit", "Nike Run Club", "Fleek", "Melon", "spotify",
  "YouTubeMusic", "지니뮤직", "FLO"
];

const urlList = [
  "speak://", "kr.epopsoft.word://", "duolingo://", "santatoeic://", "fb2000736693522600://",
  "yanadoo.page.link://", "nflx://", "youtube://", "kyoboebook://", "YES24EBOOK://",
  "com.googleusercontent.apps.1097276853518e6spvfjnfqhk8j8uon0ckkbrqhb5rckj://", "fb918233258310348://",
  "class101://", "gsd-udemy://", "notion://", "goodnotes5://", "hellolms://", "canvas-courses://",
  "megastudylink://", "mimac-nplayer://", "etoos://", "fb714191545798696://", "fb84697719333://",
  "com.googleusercontent.apps.885603266413-2g8igh7sgtm0oqhue7f16dr8f94jj57j://", "fb329785880437397://",
  "music://", "spotify://", "youtubemusic://", "fb256937297704300://", "flomusic://"
];

const unInstalledList = [
  "https://apps.apple.com/kr/app/%EC%8A%A4%ED%94%BD-speak-%EC%98%81%EC%96%B4%ED%9A%8C-%EC%8A%A4%ED%94%BC%ED%82%B9-%EB%B0%9C%EC%9D%8C/id1286609883",
  "https://apps.apple.com/kr/app/%EB%A7%90%ED%95%B4%EB%B3%B4%EC%B9%B4-%EC%98%81%EB%8B%A8%EC%96%B4-%EB%AC%B8%EB%B2%95-%EB%A6%AC%EC%8A%A4%EB%8B%9D-%EC%8A%A4%ED%94%BC%ED%82%B9-%EC%98%81%EC%96%B4-%EA%B3%B5%EB%B6%80/id1460766549",
  // ...중략...
  "https://apps.apple.com/kr/app/flo-%ED%94%8C%EB%A1%9C/id1129048043"
];

export const openApp = async (linkApp) => {
  const idx = linkAppList.findIndex(el => el === linkApp);
  const url = urlList[idx];
  const fallbackUrl = unInstalledList[idx];

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(fallbackUrl);
    }
  } catch (error) {
    Alert.alert('앱 실행 오류', '앱을 열 수 없습니다.');
    console.error('Error opening URL:', error);
  }
};
