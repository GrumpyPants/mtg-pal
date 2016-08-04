import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native'

export default class ColorIcon extends Component {

  static propTypes = {
    color: React.PropTypes.string, // the color for this icon
    store: React.PropTypes.object, // the store
  }

  static defaultProps = {
  }

  changeBackgroundColor () {
    this.props.player.bgColor = this.props.color
  }

  render () {
    return (
      <TouchableHighlight onPress={this.changeBackgroundColor.bind(this)}>
        <View style={styles.container}>
          <View style={[{backgroundColor: this.props.color},styles.colorSquare]}/>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
  },
  colorSquare: {
    flex: 1,
    margin: 4,
    //backgroundColor: 'green',
    borderRadius: 10,
  },
})