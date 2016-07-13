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
  TouchableOpacity,
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import {observer} from 'mobx-react/native'

import CounterNumber from './CounterNumber'
import PlayerName from './PlayerName'

@observer
export default class Counter extends Component {
  static propTypes = {
    min: React.PropTypes.number, // The minimum possible value for the counter
    stepValue: React.PropTypes.number, // The number to increment by
    initialValue: React.PropTypes.number, // The initial counter value
    playerName: React.PropTypes.string, // The name of the player
    customCounters: React.PropTypes.array, // The name of the player
    player: React.PropTypes.object, // player
  }

  static defaultProps = {
    min: 0,
    stepValue: 1,
    isInverted: false,
    initialValue: 20,
    playerName: 'Player Name'
  }

  constructor (props) {
    super(props)
    this.state = {
     value: this.props.initialValue,
     dimensions: {}
    }
  }

  decrementCounter () {
    this.setState({value: this.state.value - this.props.stepValue})
  }

  incrementCounter () {
    this.setState({
      value: this.state.value + this.props.stepValue,
    })
  }

  onLayout (event) {
    this.setState({dimensions: event.nativeEvent.layout})
  }

  onDecrementPressDownHandler () {
    this.props.player.life--
    //this.decrementCounter()
  }

  onIncrementPressDownHandler () {
    this.props.player.life++

    //this.incrementCounter()
  }

  onPressOutHandler () {
    //this.setState({'pressed': false})
  }

  updateNumberMargins (dimensions) {
    this.setState({
      marginLeftPosition: -dimensions.width / 2,
      marginTopPosition: -dimensions.height / 2
    })
  }

  updatePlayerNameMargins (dimensions) {
    this.setState({
      playerNameMarginLeftPosition: -dimensions.width / 2,
      playerNameMarginTopPosition: -dimensions.height / 2
    })
  }

  render () {
    const topPosition = this.state.dimensions.height / 2
    const leftPosition = this.state.dimensions.width / 2
    const numberStyleObject= {
      top: topPosition,
      left: leftPosition,
      marginLeft: this.state.marginLeftPosition,
      marginTop: this.state.marginTopPosition
    }

    const playerNameStyleObject = {
      top: this.state.dimensions.height / 4,
      left: leftPosition,
      marginLeft: this.state.playerNameMarginLeftPosition,
      marginTop: this.state.playerNameMarginTopPosition
    }

    return (
    <View style={styles.container} onLayout={this.onLayout.bind(this)}>
      <TouchableHighlight onPress={this.onDecrementPressDownHandler.bind(this)}
                          onPressOut={this.onPressOutHandler.bind(this)}
                          style={styles.leftHalfContainer}>
          <Image source={require('../img/subtract.png')} style={styles.minusIcon}/>
      </TouchableHighlight>

      <TouchableHighlight onPress={this.onIncrementPressDownHandler.bind(this)}
                          onPressOut={this.onPressOutHandler.bind(this)}
                          style={styles.rightHalfContainer}>
          <Image source={require('../img/add.png')} style={styles.plusIcon}/>
      </TouchableHighlight>

      <View style={[styles.number, numberStyleObject]}>
        <CounterNumber value={this.props.player.life} onLayoutChange={this.updateNumberMargins.bind(this)}/>
      </View>

      <View style={[styles.playerName, playerNameStyleObject]}>
        <PlayerName playerName={this.props.player.name} onLayoutChange={this.updatePlayerNameMargins.bind(this)}/>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 2,
    //backgroundColor:'transparent',
    backgroundColor:'green',
  },
  inverted: {
    transform: [{rotate: '180deg'}],
  },

  minusIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 4,
    bottom: 4
  },
  plusIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 4,
    bottom: 4
  },
  leftHalfContainer: {
    backgroundColor: 'deepskyblue',
    flex: 1,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  rightHalfContainer: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  number: {
    position: 'absolute',
  },
  playerName: {
    position: 'absolute',
  }
})
