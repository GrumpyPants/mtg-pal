import React, {
 Component,
 PropTypes
} from 'react'

import {
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import {observer} from 'mobx-react/native'
import {BlurView} from 'react-native-blur';

import CounterNumber from './CounterNumber'
import ColorIcon from './ColorIcon'
import PlayerName from './PlayerName'
import Sound from 'react-native-sound'

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

    this.clickSound = new Sound('click.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this.clickSound.getDuration() +
          'number of channels: ' + this.clickSound.getNumberOfChannels());
      }
    })

    this.tadaSound = new Sound('tada.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this.tadaSound.getDuration() +
          'number of channels: ' + this.tadaSound.getNumberOfChannels());
      }
    })

    this.state = {
     value: this.props.initialValue,
     dimensions: {},
     roll: null
    }
  }

  componentWillReceiveProps (newProps){
    if (newProps.doRollDiceAnimation) {
      this.doDiceRollAnimation()
    }
  }

  doDiceRollAnimation () {
    const _this = this
    this.setState({isWinner: false})

    this.props.store.playTickTockSound()
    const intervalID = window.setInterval(() => {
      _this.setState({roll: Math.floor(Math.random() * 6) + 1})
    }, 200)

    window.setTimeout(() => {
      window.clearInterval(intervalID)
      _this.setState({roll: this.props.player.roll, isWinner: _this.props.player.winner})
      _this.props.store.isRollingDiceAnimationActive = false
      _this.props.store.stopTickTockSound()
      if (_this.props.player.winner) {
        _this.refs.diceView.tada(1600)
      }
    }, 2000)
  }

  onLayout (event) {
    this.setState({dimensions: event.nativeEvent.layout})
  }

  onDecrementPressDownHandler () {
    this.clickSound.play()
    this.props.player.life--
  }

  onIncrementPressDownHandler () {
    this.clickSound.play()
    this.props.player.life++
  }

  onPressOutHandler () {
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
    const touchableOpacityStyle = {backgroundColor: this.props.player.bgColor}
    const minusIconStyle = {}
    switch(this.props.facing) {
      case 'left':
        touchableOpacityStyle.borderTopLeftRadius = 30
        touchableOpacityStyle.borderTopRightRadius = 30
        minusIconStyle.top = 4
        minusIconStyle.left = 4
        minusIconStyle.transform = [{rotate: '90deg'}]
        break
      case 'right':
        touchableOpacityStyle.borderBottomLeftRadius = 30
        touchableOpacityStyle.borderBottomRightRadius = 30
        minusIconStyle.bottom = 4
        minusIconStyle.right = 4
        minusIconStyle.transform = [{rotate: '90deg'}]
        break
      case 'up':
        touchableOpacityStyle.borderTopRightRadius = 30
        touchableOpacityStyle.borderBottomRightRadius = 30
        minusIconStyle.top = 4
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
    const touchableOpacityStyle = {backgroundColor: this.props.player.bgColor}
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
      case 'up':
        touchableOpacityStyle.borderTopLeftRadius = 30
        touchableOpacityStyle.borderBottomLeftRadius = 30
        plusIconStyle.top = 4
        plusIconStyle.left = 4
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

  handleRollViewPressed () {
    this.props.store.isRollingDiceViewVisible = false
    this.setState({roll: null, isWinner: null})
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
    let diceContainerStyle = {}
    const facing = this.props.facing
    if (facing) {
      if (facing === 'up') {
        counterDirection = styles.facingUp
        diceContainerStyle.transform = [{rotate: '180deg'}]
      }
      else if (facing === 'left') {
        counterDirection = styles.facingLeft
        diceContainerStyle.transform = [{rotate: '90deg'}]
      }
      else if (facing === 'right') {
        diceContainerStyle.transform = [{rotate: '270deg'}]
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
    if (this.props.facing === 'right' || this.props.facing === 'up')
      incrementDecrementSections =  [this.getIncrementHalf(), this.getDecrementHalf()]

    let diceIcon
    switch (this.state.roll) {
      case 1:
        diceIcon = require('../img/dice1.png')
        break
      case 2:
        diceIcon = require('../img/dice2.png')
        break
      case 3:
        diceIcon = require('../img/dice3.png')
        break
      case 4:
        diceIcon = require('../img/dice4.png')
        break
      case 5:
        diceIcon = require('../img/dice5.png')
        break
      case 6:
        diceIcon = require('../img/dice6.png')
        break
      default:
        diceIcon = require('../img/dice1.png')
    }

    return (
    <View style={[styles.container, {flexDirection: this.props.facing === 'right' || this.props.facing === 'left' ? 'column' : 'row'}]} onLayout={this.onLayout.bind(this)}>

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

      {
        this.props.store.isRollingDiceViewVisible ?
        <TouchableWithoutFeedback onPress={this.handleRollViewPressed.bind(this)}>
          <View
            style={[styles.blurContainer]}>
            <BlurView blurType="light" style={[{width: this.state.dimensions.width, height: this.state.dimensions.height}]}>
            <View style={[diceContainerStyle, styles.blurContentContainer]}>
              <Animatable.View ref="diceView"
                style={[styles.blurContentContainer]}>
                <Image
                  style={[styles.diceImage]}
                  source={diceIcon}
                />
                {this.state.isWinner ? <Text style={styles.diceWinnerText}>Winner!</Text> : null}
              </Animatable.View>
              </View>
            </BlurView>
          </View>
        </TouchableWithoutFeedback> : null
      }

      {
        this.props.player.isBackgroundColorViewVisible ?
          <TouchableWithoutFeedback>
            <BlurView blurType="light" style={[styles.bgColorContainer, {width: this.state.dimensions.width, height: this.state.dimensions.height}]}>
            <View style={[styles.bgColorContentContainer]}>
              <ColorIcon color='deepskyblue' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='steelblue' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='aqua' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='slategrey' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='seagreen' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='orangered' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='deeppink' store={this.props.store} player={this.props.player}/>
              <ColorIcon color='mintcream' store={this.props.store} player={this.props.player}/>
            </View>
            </BlurView>
          </TouchableWithoutFeedback> : null
      }
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 30,
    //margin: 2,
    backgroundColor:'transparent',
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
    //backgroundColor: 'deepskyblue',
    flex: 1,
  },
  number: {
    position: 'absolute',
  },
  playerName: {
    position: 'absolute',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 30,
  },
  blurContentContainer: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  diceImage: {
    width: 100,
    height: 100,
  },
  diceWinnerText: {
    marginTop: 10,
    fontSize: 18
  },
  bgColorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 30,
  },
  bgColorContentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
