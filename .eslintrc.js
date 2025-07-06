// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@react-native-community'],       // RN 커뮤니티 기본 설정 확장
  parser: '@babel/eslint-parser',             // Babel ESLint 파서 사용
  parserOptions: {
    requireConfigFile: false,                 // “설정 파일 없어도 파싱” 허용
    babelOptions: {
      configFile: '../babel.config.js',        // 실제 Babel 설정 파일 경로 지정
    },
  },
};
