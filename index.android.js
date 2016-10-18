import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './src/components/App';

class mtgPal extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('mtgPal', () => mtgPal);

