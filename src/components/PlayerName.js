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


export default class PlayerName extends Component {

  static propTypes = {
    playerName: React.PropTypes.string.isRequired, // font size
  }

  static defaultProps = {
    fontSize: 40,
    playerName: 'Player Name'
  }

  onLayoutChange (event) {
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(event.nativeEvent.layout)
    }
  }

  render () {
    return (
      <View onLayout={this.onLayoutChange.bind(this)} pointerEvents='none'>
        <Text style={[{fontSize: this.props.fontSize}]}>
          {this.props.playerName}
        </Text>
      </View>
    )
  }

}