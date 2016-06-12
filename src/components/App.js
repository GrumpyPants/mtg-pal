import React, { Component, PropTypes } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Counter from './Counter'

class App extends Component {
  static propTypes = {
   instructions: React.PropTypes.string
  }

  static defaultProps = {
    ...Component.defaultProps,
    instructions: 'Usage instructions not provided.',
  }

  render () {
  //TODO 2v2, free for all with 3 or 4
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Counter max={20} min={0} stepValue={1} isInverted={true}/>
        </View>
        <View style={styles.lowerContainer}>
          <Counter max={20} min={0} stepValue={1}/>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  lifeTotal: {
    fontSize: 120,
  },
})

export default App
