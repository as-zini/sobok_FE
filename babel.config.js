module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@emotion',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
  ],
};
