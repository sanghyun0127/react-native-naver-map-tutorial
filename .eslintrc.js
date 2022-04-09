module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0, // 불필요한 스타일 선언 하지 않기 (에러로 처리)
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
};
