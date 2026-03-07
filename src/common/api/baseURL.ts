import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NavigationService from '@/common/ui/components/NavigationService';

const baseUrl = axios.create({
  baseURL: 'https://sobok-app.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ✅ 요청 인터셉터: access_token 추가
baseUrl.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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
