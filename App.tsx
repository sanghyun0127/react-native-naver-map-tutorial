import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ShowMap from './src/pages/map/ShowMap';
import { MainStackScreens } from './src/navigation/Stack';
import usePermissions from './src/hook/usePermissions';

const App = () => {
  usePermissions();

  return <MainStackScreens />;
};

export default App;
