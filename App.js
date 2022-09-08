import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Router from './Router';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  return (
    <RootSiblingParent>
      <Router />
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({

});

export default App;
