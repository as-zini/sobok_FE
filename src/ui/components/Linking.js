import * as Linking from 'expo-linking'
import { Alert } from 'react-native';


export const openApp = (linkApp) => {
  const linkAppList = ["스픽", "말해보카", "Duolingo","산타", "Cake","야나두","Netflix","YouTube","교보eBook","예스24 eBook","밀리의서재","윌라","Class101","Udemy","Notion","Goodnotes","HelloLMS","LearninX student","메가스터디 스마트러닝","대성마이맥 Player","이투스 수강앱-Smart Study","Planfit","Nike Run Club","Fleek","Melon","spotify","YouTubeMusic","지니뮤직","FLO"]
  const urlList = ["speak://","kr.epopsoft.word://","duolingo://","santatoeic://","fb2000736693522600://","yanadoo.page.link://","nflx://","youtube://","kyoboebook://","YES24EBOOK://","com.googleusercontent.apps.1097276853518e6spvfjnfqhk8j8uon0ckkbrqhb5rckj://","fb918233258310348://","class101://","gsd-udemy://","notion://"," goodnotes5://"," hellolms://","canvas-courses://","megastudylink://","mimac-nplayer://","etoos://","fb714191545798696://","fb84697719333://","com.googleusercontent.apps.885603266413-2g8igh7sgtm0oqhue7f16dr8f94jj57j://","fb329785880437397://","music://","spotify://","youtubemusic://","fb256937297704300://","flomusic://"]
  const url = urlList[linkAppList.findIndex((el) => el===linkApp)]

    const supported = Linking.canOpenURL(url);
    if (supported) {
      // 앱이 설치되어 있으면 해당 앱을 실행
      Linking.openURL(url);
    } else {
      // 앱이 설치되어 있지 않으면 앱스토어로 이동
      Alert.alert("오류 발생", "앱을 열 수 없습니다.");      
    }
  
};

