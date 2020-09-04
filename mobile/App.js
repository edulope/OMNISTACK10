import React from 'react';
import { StyleSheet, Text, View, StatusBar, YellowBox } from 'react-native';



import Routes from './src/routes'

YellowBox.ignoreWarnings([
  'Unrecognizer WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="7D40E7"/>
      <Routes />
    </>
  );
}
