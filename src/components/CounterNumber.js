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


export default class CounterNumber extends Component {

  static propTypes = {
    fontSize: React.PropTypes.number.isRequired, // font size
  }

  static defaultProps = {
    fontSize: 120
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
          {this.props.value}
        </Text>
      </View>
    )
  }

}