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
} from 'react-native'

export default class Counter extends Component {
  static propTypes = {
    max: React.PropTypes.number, // The maximum possible value for the counter
    min: React.PropTypes.number, // The minimum possible value for the counter
    stepValue: React.PropTypes.number, // The number to increment by
  }

  static defaultProps = {
    max: 20,
    min: 0,
    stepValue: 1,
    isInverted: false,
  }

  constructor (props) {
    super(props)
    this.state = {
     value: 0,
    }
  }

  decrementCounter () {
    this.setState({value: this.state.value - this.props.stepValue})
  }

  incrementCounter () {
    this.setState({value: this.state.value + this.props.stepValue})
  }

  render () {
    return (
      <View style={[styles.container, this.props.isInverted && styles.inverted]}>

        <TouchableHighlight onPress={this.decrementCounter.bind(this)}>
          <Image source={require('../img/subtract.png')} style={styles.icon}/>
        </TouchableHighlight>

        <Text style={styles.number}>
          {this.state.value}
        </Text>

        <TouchableHighlight onPress={this.incrementCounter.bind(this)}>
          <Image source={require('../img/add.png')} style={styles.icon}/>
        </TouchableHighlight>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inverted: {
    transform: [{rotate: '180deg'}],
  },
  number: {
    fontSize: 120,
    alignSelf: 'center',
    margin: 50,
  },
  icon: {
    height: 30,
    width: 30,
  }
})
