import React, { Component, PropTypes } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native'

import TwoPlayerBoard from './TwoPlayerBoard'
import ThreePlayerBoard from './ThreePlayerBoard'
import FourPlayerBoard from './FourPlayerBoard'
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
      case '2Players':
        return (
          <TwoPlayerBoard
            name={route.name}
            store={route.store}
            navigator={navigator}
            {...route.passProps}
          />
        )
      case '3Players':
        return (
          <ThreePlayerBoard
            name={route.name}
            navigator={navigator}
            store={route.store}
            {...route.passProps}
          />
        )
      case '4Players':
        return (
          <FourPlayerBoard
            name={route.name}
            store={route.store}
            navigator={navigator}
            {...route.passProps}
          />
        )
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
