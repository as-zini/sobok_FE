
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import axios, { Axios } from 'axios';
// import NavigationService from '../ui/components/NavigationService';

// const baseUrl = axios.create({
//     baseURL: 'https://sobok-app.com',
//     timeout: 5000,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });



// baseUrl.interceptors.request.use( async (config) =>
//     {
//         try {
//           // 🔥 AsyncStorage에서 쿠키 가져오기 (비동기 사용 가능!)
//           const cookie = await AsyncStorage.getItem('access_token');
//           console.log(cookie)
      
//           if (cookie) {
//             config.headers['Content-Type'] = 'application/json';
//             config.headers['Authorization'] = `Bearer ${cookie}`;
//           }
//         } catch (error) {
//           console.error('쿠키 불러오기 에러:', error);
//         }
      
//         return config;
//       }, (error) => {
//         console.log(error);
//         return Promise.reject(error);
//       });


// let isTokenRefreshing = false;  // 토큰 갱신 상태를 추적

// baseUrl.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config; // 실패한 요청 저장
//         // console.log('Original Request:', originalRequest);

//         // 이미 토큰 갱신을 시도 중이면 재시도를 하지 않도록 합니다.
//         if (error.response?.status === 401 && !isTokenRefreshing) {
//             isTokenRefreshing = true; // 토큰 갱신 시작
//             console.log('토큰 만료됨, 리프레시 시도!');

//             const refreshToken = await AsyncStorage.getItem('refresh_token');
//             // const accessToken = await AsyncStorage.getItem('access_token'); // JSON.parse 필요 없을 경우 확인

//             if (refreshToken) {
//                 try {
//                     console.log('리프레시 토큰:', refreshToken);
//                     const response = await axios.post('https://sobok-app.com/user/refresh-token', {}, {
//                         headers: {
//                             'Authorization': `Bearer ${refreshToken}`,
//                             'Content-Type': 'application/json',
//                         },
//                         withCredentials: true
//                     });
//                     console.log("새로운 토큰 받아옴:", response.data.accessToken);
//                     await AsyncStorage.setItem('access_token', response.data.accessToken);
//                     // 실패했던 요청 다시 시도!
//                     console.log("Retrying original request with new token...");
//                     originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//                     // console.log(error.config)
//                     // 재시도 후, isTokenRefreshing을 false로 설정하여 다른 요청이 대기하지 않도록 합니다.
//                     isTokenRefreshing = false;
//                     console.log("Request headers before retry:", originalRequest);
                    
//                     const finalResponse = await axios.request(originalRequest)
//                     return finalResponse // 재시도
//                 } catch (error) {
//                     console.log('토큰 갱신 실패!', error);
//                     isTokenRefreshing = false; // 토큰 갱신 실패 시 플래그 리셋
//                 }
//             }
//         }

//         // 토큰 갱신을 할 수 없는 경우 (예: 리프레시 토큰도 만료됨)
//         if (isTokenRefreshing) {
//             console.log('토큰 갱신 실패, 사용자 로그아웃 처리 또는 다른 조치 필요');
//             NavigationService.navigate('Start');
//         }

//         return Promise.reject(error);
//     }
// );

// export default baseUrl;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NavigationService from '../ui/components/NavigationService';

const baseUrl = axios.create({
  baseURL: 'https://sobok-app.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ✅ 요청 인터셉터: access_token 추가
baseUrl.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
      }
    } catch (error) {
      console.error('토큰 불러오기 실패:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isTokenRefreshing = false;

// ✅ 응답 인터셉터: 401 → 리프레시 시도
baseUrl.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        console.log('🔁 토큰 만료, 리프레시 시도');

        const refreshToken = await AsyncStorage.getItem('refresh_token');

        if (refreshToken) {
          try {
            const response = await axios.post(
              'https://sobok-app.com/user/refresh-token',
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            );

            const newAccessToken = response.data.accessToken;
            console.log('✅ 새 토큰 발급:', newAccessToken);

            await AsyncStorage.setItem('access_token', newAccessToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            isTokenRefreshing = false;

            return axios(originalRequest); // 🔁 실패했던 요청 재시도
          } catch (e) {
            console.log('❌ 토큰 갱신 실패:', e.response?.data || e.message);
            isTokenRefreshing = false;

            // ✅ 리프레시 실패 → Start 화면으로 이동
            NavigationService.navigate('Start');
            return Promise.reject(e);
          }
        } else {
          console.log('❌ 리프레시 토큰 없음');
          NavigationService.navigate('Start');
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default baseUrl;
