import * as Linking from 'expo-linking'
import { Alert } from 'react-native';


export const openApp = async (linkApp) => {
  const linkAppList = ["스픽", "말해보카", "Duolingo","산타", "Cake","야나두","Netflix","YouTube","교보eBook","예스24 eBook","밀리의서재","윌라","Class101","Udemy","Notion","Goodnotes","HelloLMS","LearninX student","메가스터디 스마트러닝","대성마이맥 Player","이투스 수강앱-Smart Study","Planfit","Nike Run Club","Fleek","Melon","spotify","YouTubeMusic","지니뮤직","FLO"]
  const urlList = ["speak://","kr.epopsoft.word://","duolingo://","santatoeic://","fb2000736693522600://","yanadoo.page.link://","nflx://","youtube://","kyoboebook://","YES24EBOOK://","com.googleusercontent.apps.1097276853518e6spvfjnfqhk8j8uon0ckkbrqhb5rckj://","fb918233258310348://","class101://","gsd-udemy://","notion://"," goodnotes5://"," hellolms://","canvas-courses://","megastudylink://","mimac-nplayer://","etoos://","fb714191545798696://","fb84697719333://","com.googleusercontent.apps.885603266413-2g8igh7sgtm0oqhue7f16dr8f94jj57j://","fb329785880437397://","music://","spotify://","youtubemusic://","fb256937297704300://","flomusic://"]
  const unInstalledList = 
  ["https://apps.apple.com/kr/app/%EC%8A%A4%ED%94%BD-speak-%EC%98%81%EC%96%B4%ED%9A%8C%ED%99%94-%EC%8A%A4%ED%94%BC%ED%82%B9-%EB%B0%9C%EC%9D%8C/id1286609883",
  "https://apps.apple.com/kr/app/%EB%A7%90%ED%95%B4%EB%B3%B4%EC%B9%B4-%EC%98%81%EB%8B%A8%EC%96%B4-%EB%AC%B8%EB%B2%95-%EB%A6%AC%EC%8A%A4%EB%8B%9D-%EC%8A%A4%ED%94%BC%ED%82%B9-%EC%98%81%EC%96%B4-%EA%B3%B5%EB%B6%80/id1460766549",
  "https://apps.apple.com/kr/app/%EB%93%80%EC%98%A4%EB%A7%81%EA%B3%A0-duolingo-%EC%96%B8%EC%96%B4-%ED%95%99%EC%8A%B5/id570060128",
  "https://apps.apple.com/kr/app/%EC%82%B0%ED%83%80-ai-%ED%86%A0%EC%9D%B5-%EC%A7%80%ED%85%94%ED%94%84/id1148006701",
  "https://apps.apple.com/kr/app/cake-%EC%A0%84-%EC%84%B8%EA%B3%84-1%EC%96%B5-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%98%81%EC%96%B4-%ED%95%99%EC%8A%B5-%EC%95%B1/id1350420987",
  "https://apps.apple.com/kr/app/%EC%95%BC%EB%82%98%EB%91%90/id1539582420",
  "https://apps.apple.com/kr/app/netflix/id363590051",
  "https://apps.apple.com/kr/app/youtube/id544007664",
  "https://apps.apple.com/kr/app/%EA%B5%90%EB%B3%B4ebook-e%EC%84%B8%EC%83%81%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%A0%84%EC%9E%90%EC%B1%85/id445290463",
  "https://apps.apple.com/kr/app/%EC%98%88%EC%8A%A424-ebook-yes24-ebook/id1009076561",
  "https://apps.apple.com/kr/app/%EB%B0%80%EB%A6%AC%EC%9D%98-%EC%84%9C%EC%9E%AC/id1213788923",
  "https://apps.apple.com/kr/app/%EC%9C%8C%EB%9D%BC/id1250319483",
  "https://apps.apple.com/kr/app/class101-%ED%81%B4%EB%9E%98%EC%8A%A4101/id1320607634",
  "https://apps.apple.com/kr/app/udemy-online-video-courses/id562413829",
  "https://apps.apple.com/kr/app/notion-%EB%85%B8%ED%8A%B8-%EC%9E%91%EC%97%85-ai/id1232780281",
  "https://apps.apple.com/kr/app/goodnotes-6/id1444383602",
  "https://apps.apple.com/kr/app/hellolms/id1450244711",
  "https://apps.apple.com/kr/app/learningx-student-%ED%95%99%EC%8A%B5%EC%9E%90-%EC%9A%A9/id1428254462",
  "https://apps.apple.com/kr/app/%EB%A9%94%EA%B0%80%EC%8A%A4%ED%84%B0%EB%94%94-%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%9F%AC%EB%8B%9D/id670116327",
  "https://apps.apple.com/kr/app/%EB%8C%80%EC%84%B1%EB%A7%88%EC%9D%B4%EB%A7%A5-player/id1441926211",
  "https://apps.apple.com/kr/app/%EC%9D%B4%ED%88%AC%EC%8A%A4-%EC%88%98%EA%B0%95%EC%95%B1-smart-study/id1486564159",
  "https://apps.apple.com/kr/app/%ED%94%8C%EB%9E%9C%ED%95%8F-%EC%9A%B4%EB%8F%99-%EB%A3%A8%ED%8B%B4-%EC%B6%94%EC%B2%9C%EA%B3%BC-%ED%97%AC%EC%8A%A4-%ED%99%88%ED%8A%B8-%ED%94%BC%ED%8A%B8%EB%8B%88%EC%8A%A4-%EA%B8%B0%EB%A1%9D/id1511876936",
  "https://apps.apple.com/kr/app/nike-run-club-%EB%9F%AC%EB%8B%9D-%EC%95%B1/id387771637",
  "https://apps.apple.com/kr/app/%ED%94%8C%EB%A6%AD-%EC%9A%B4%EB%8F%99%EC%9D%BC%EC%A7%80-%EC%9A%B4%EB%8F%99%EA%B8%B0%EB%A1%9D-%EC%9A%B4%EB%8F%99%EC%9D%BC%EA%B8%B0-%EC%9A%B4%EB%8F%99%EB%A3%A8%ED%8B%B4/id1576993198",
  "https://apps.apple.com/kr/app/%EB%A9%9C%EB%A1%A0-melon/id415597317",
  "https://apps.apple.com/kr/app/spotify-%EC%8A%A4%ED%8F%AC%ED%8B%B0%ED%8C%8C%EC%9D%B4-%EB%AE%A4%EC%A7%81-%ED%8C%9F%EC%BA%90%EC%8A%A4%ED%8A%B8-%EC%95%B1/id324684580",
  "https://apps.apple.com/kr/app/youtube-music/id1017492454",
  "https://apps.apple.com/kr/app/%EC%A7%80%EB%8B%88%EB%AE%A4%EC%A7%81-genie/id858266085",
  "https://apps.apple.com/kr/app/flo-%ED%94%8C%EB%A1%9C/id1129048043"
]


  const url = urlList[linkAppList.findIndex((el) => el===linkApp)]
  const unInstallUrl = unInstalledList[linkAppList.findIndex((el) => el===linkApp)]
  try {
    const supported = await Linking.canOpenURL(url); // ⬅️ await을 추가
    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(unInstallUrl);
    }
    console.log(supported);
    console.log(url);
  } catch (error) {
    console.error("Error checking URL:", error);
  }
};

