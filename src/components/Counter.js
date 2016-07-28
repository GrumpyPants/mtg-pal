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
    facing: React.PropTypes.string, // the direction the counter is facing
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

  getDecrementHalf () {
    const touchableOpacityStyle = {}
    const minusIconStyle = {}
    switch(this.props.facing) {
      case 'left':
        touchableOpacityStyle.borderTopLeftRadius = 30
        touchableOpacityStyle.borderTopRightRadius = 30
        minusIconStyle.top = 4
        minusIconStyle.left = 4
        break
      case 'right':
        touchableOpacityStyle.borderBottomLeftRadius = 30
        touchableOpacityStyle.borderBottomRightRadius = 30
        minusIconStyle.bottom = 4
        minusIconStyle.right = 4
        break
      default:
        touchableOpacityStyle.borderTopLeftRadius = 30
        touchableOpacityStyle.borderBottomLeftRadius = 30
        minusIconStyle.bottom = 4
        minusIconStyle.left = 4
    }

    return (
      <TouchableOpacity onPress={this.onDecrementPressDownHandler.bind(this)}
                        onPressOut={this.onPressOutHandler.bind(this)}
                        style={[styles.touchableOpacityContainer, touchableOpacityStyle]}>
        <Image source={require('../img/subtract.png')} style={[styles.minusIcon, minusIconStyle]}/>
      </TouchableOpacity>
    )
  }

  getIncrementHalf () {
    const touchableOpacityStyle = {}
    const plusIconStyle = {}
    switch(this.props.facing) {
      case 'left':
        touchableOpacityStyle.borderBottomLeftRadius = 30
        touchableOpacityStyle.borderBottomRightRadius = 30
        plusIconStyle.left = 4
        plusIconStyle.bottom = 4
        break
      case 'right':
        touchableOpacityStyle.borderTopLeftRadius = 30
        touchableOpacityStyle.borderTopRightRadius = 30
        plusIconStyle.right = 4
        plusIconStyle.top = 4
        break
      default:
        touchableOpacityStyle.borderTopRightRadius = 30
        touchableOpacityStyle.borderBottomRightRadius = 30
        plusIconStyle.right = 4
        plusIconStyle.bottom = 4
    }

    return (
      <TouchableOpacity onPress={this.onIncrementPressDownHandler.bind(this)}
                        onPressOut={this.onPressOutHandler.bind(this)}
                        style={[styles.touchableOpacityContainer, touchableOpacityStyle]}>
        <Image source={require('../img/add.png')} style={[styles.plusIcon, plusIconStyle]}/>
      </TouchableOpacity>
    )
  }

  render () {
    const topPosition = this.state.dimensions.height / 2
    const leftPosition = this.state.dimensions.width / 2
    const numberStyleObject= {
      marginLeft: this.state.marginLeftPosition,
      marginTop: this.state.marginTopPosition
    }

    const playerNameStyleObject = {
      marginLeft: this.state.playerNameMarginLeftPosition,
      marginTop: this.state.playerNameMarginTopPosition
    }

    let counterDirection = {}
    const facing = this.props.facing
    if (facing) {
      if (facing === 'up') {
        counterDirection = styles.facingUp
      }
      else if (facing === 'left') {
        counterDirection = styles.facingLeft
      }
      else if (facing === 'right') {
        counterDirection = styles.facingRight
      }
    }

    let counterNumberSize
    switch(this.props.facing) {
      case 'left':
        counterNumberSize = this.state.dimensions.height ? this.state.dimensions.height / 3 : 120
        playerNameStyleObject.top = this.state.dimensions.height / 2
        playerNameStyleObject.right = - counterNumberSize / 4 - 10
        numberStyleObject.top = this.state.dimensions.height / 2
        numberStyleObject.left = this.state.dimensions.width / 2
        break
      case 'right':
        counterNumberSize = this.state.dimensions.height ? this.state.dimensions.height / 3 : 120
        playerNameStyleObject.top = this.state.dimensions.height / 2
        playerNameStyleObject.left = counterNumberSize / 4 - 10
        numberStyleObject.top = this.state.dimensions.height / 2
        numberStyleObject.left = this.state.dimensions.width / 2 + 10
        break
      default:
        counterNumberSize = this.state.dimensions.width ? this.state.dimensions.width / 3 : 120
        playerNameStyleObject.left = leftPosition
        playerNameStyleObject.top = this.state.dimensions.height / 4 - 10
        numberStyleObject.top = this.state.dimensions.height / 2 + 10
        numberStyleObject.left = this.state.dimensions.width / 2
    }

    let incrementDecrementSections = [this.getDecrementHalf(), this.getIncrementHalf()]
    if (this.props.facing === 'right')
      incrementDecrementSections =  [this.getIncrementHalf(), this.getDecrementHalf()]

    return (
    <View style={[styles.container, {flexDirection: this.props.facing ? 'column' : 'row'}]} onLayout={this.onLayout.bind(this)}>

      {incrementDecrementSections}

      <View style={[styles.number, numberStyleObject, counterDirection]}>
        <CounterNumber fontSize={counterNumberSize}
                       value={this.props.player.life}
                       onLayoutChange={this.updateNumberMargins.bind(this)}/>
      </View>

      <View style={[styles.playerName, playerNameStyleObject, counterDirection]}>
        <PlayerName fontSize={counterNumberSize / 4}
                    playerName={this.props.player.name}
                    onLayoutChange={this.updatePlayerNameMargins.bind(this)}/>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 30,
    margin: 2,
    backgroundColor:'transparent',
    //backgroundColor:'green',
  },
  facingUp: {
    transform: [{rotate: '180deg'}],
  },
  facingLeft: {
    transform: [{rotate: '90deg'}],
  },
  facingRight: {
    transform: [{rotate: '270deg'}],
  },
  minusIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
  },
  plusIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
  },
  touchableOpacityContainer: {
    backgroundColor: 'deepskyblue',
    flex: 1,
  },
  number: {
    position: 'absolute',
  },
  playerName: {
    position: 'absolute',
  }
})
