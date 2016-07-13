import React, { Component, PropTypes } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native'

import TwoPlayerBoard from './TwoPlayerBoard'
import Settings from './Settings'
import MTGHelperStore from '../store/MTGHelperStore'

class App extends Component {
  static propTypes = {
   instructions: React.PropTypes.string
  }

  static defaultProps = {
    ...Component.defaultProps,
    instructions: 'Usage instructions not provided.',
  }

  renderScene (route, navigator) {
    switch (route.id) {
      case 'settings':
        return <Settings navigator={navigator} />;
      default:
        return (
          <TwoPlayerBoard
            name={route.name}
            navigator={navigator}
            {...route.passProps}
          />
        )
    }
  }

  render () {
  //TODO 2v2, free for all with 3 or 4
    return (
      <Navigator initialRoute={{
                   name: 'Counter Screen',
                   index: 0,
                   passProps: {
                     store: MTGHelperStore
                   }
                 }}
                 renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  upperContainer: {
    flex: 1,
    borderWidth: 1,
  },
  lowerContainer: {
    flex: 1,
    borderWidth: 1,
  },
  lifeTotal: {
    fontSize: 120,
  },
  menuBar: {
    backgroundColor: 'black',
    borderWidth: 1,
  },
})

export default App
