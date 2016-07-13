import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native'

export default class Settings extends Component {

  static propTypes = {

  }

  static defaultProps = {
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>There will be blood</Text>
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
})