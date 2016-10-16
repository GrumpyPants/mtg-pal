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
  TouchableHighlight,
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNShakeEventIOS from 'react-native-shake-event-ios';

export default class MenuBar extends Component {

  static propTypes = {
    onSetLifeTotal: React.PropTypes.func.isRequired, // handler for when the life total changes
    store: React.PropTypes.object.isRequired, // the magic store
  }

  static defaultProps = {
    showNumPlayersMenu: false,
  }

  static hitSlop = {top: 20, left:20, bottom: 20, right: 20};

  constructor (props) {
    super(props)
    this.state = {
      showLifeMenu: false,
      showNumPlayersMenu: false,
    }
  }

  componentWillMount() {
    if(Platform.OS === 'ios') {
      RNShakeEventIOS.addEventListener('shake', () => {
        this.onDiceRollPressed()
      })
    }
  }

  componentWillUnmount() {
    if(Platform.OS === 'ios') {
      RNShakeEventIOS.removeEventListener('shake')
    }
  }

  onChangeBackgroundPressed () {
    const playersWithBGViewVisible = this.props.store.players.filter((player) => player.isBackgroundColorViewVisible)
    if (playersWithBGViewVisible.length === 0) {
      this.props.store.setAllBackgroundColorViews(true)
    }
    else {
      this.props.store.setAllBackgroundColorViews(false)
    }
  }

  transitionMenu (menuType) {
    this.props.store.setAllBackgroundColorViews(false)
    this.props.store.isRollingDiceViewVisible = false
    this.props.store.clearDiceRoll()
    const menuBar = this.refs.menuBar
    const _this = this

    this.refs.menuBar.slideOutRight(200)
      .then(() => {
        _this.setState({menuType})
        menuBar.slideInLeft(200)
      })
  }

  onDiceRollPressed () {
    this.props.store.setAllBackgroundColorViews(false)
    this.props.store.rollDice()
  }

  onBackToMainMenuPressed (menuRef) {
    const menuBar = this.refs[menuRef]
    const _this = this
    menuBar.slideOutLeft(200)
      .then(() => {
        _this.setState({menuType: 'main'}, () => this.refs.menuBar.slideInRight(200))
      })
  }

  onResetPressed () {
    this.props.store.setAllBackgroundColorViews(false)
    this.props.store.isRollingDiceViewVisible = false
    this.props.store.clearDiceRoll()
    this.props.store.resetLifeTotals()
  }

  setLifeTotal (lifeTotal) {
    this.props.store.setAllPlayersLife(lifeTotal)
    this.onBackToMainMenuPressed('lifeMenu')
  }

  getLifeTotalMenu () {
    const backIcon = (<Icon name="arrow-left" size={30} color="white" onPress={this.onBackToMainMenuPressed.bind(this, 'lifeMenu')}/>)

    const lifeIcon20 = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.setLifeTotal.bind(this, 20)}>
        <Image
          style={styles.button}
          source={require('../img/20-health.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon30 = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.setLifeTotal.bind(this, 30)}>
        <Image
          style={styles.button}
          source={require('../img/30-health.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon40 = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.setLifeTotal.bind(this, 40)}>
        <Image
          style={styles.button}
          source={require('../img/40-health.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon50 = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.setLifeTotal.bind(this, 50)}>
        <Image
          style={styles.button}
          source={require('../img/50-health.png')}
        />
      </TouchableHighlight>
    )

    return (
      <Animatable.View ref='lifeMenu' style={styles.container}>
        {backIcon}
        {lifeIcon20}
        {lifeIcon30}
        {lifeIcon40}
        {lifeIcon50}
      </Animatable.View>
    )
  }

  onChangeNumPlayersPressed (numPlayers) {
    if (this.props.store.players.length === numPlayers) {
      this.props.store.resetLifeTotals()
    }
    else {
      this.props.store.setNumPlayers(numPlayers)
      this.props.navigator.immediatelyResetRouteStack([{id:numPlayers + 'Players', store: this.props.store, reset: true }])
    }
  }

  getPlayersMenu () {
    const backIcon = (<Icon name="arrow-left" size={30} color="white" onPress={this.onBackToMainMenuPressed.bind(this, 'playersMenu')}/>)

    const twoPlayerIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.onChangeNumPlayersPressed.bind(this, 2)}>
        <Image
          style={styles.button}
          source={require('../img/2Players.png')}
        />
      </TouchableHighlight>
    )

    const threePlayerIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.onChangeNumPlayersPressed.bind(this, 3)}>
        <Image
          style={styles.button}
          source={require('../img/3Players.png')}
        />
      </TouchableHighlight>
    )

    const fourPlayerIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.onChangeNumPlayersPressed.bind(this, 4)}>
        <Image
          style={styles.button}
          source={require('../img/4Players.png')}
        />
      </TouchableHighlight>
    )

    return (
      <Animatable.View ref='playersMenu' style={styles.container}>
        {backIcon}
        {twoPlayerIcon}
        {threePlayerIcon}
        {fourPlayerIcon}
      </Animatable.View>
    )
  }

  getLifeIcon (lifeTotal) {
    let icon
    switch (lifeTotal) {
      case 30:
        icon = require('../img/30-health.png')
        break
      case 40:
        icon = require('../img/40-health.png')
        break
      case 50:
        icon = require('../img/50-health.png')
        break
      default:
        icon = require('../img/20-health.png')
    }

    return (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.transitionMenu.bind(this, 'lifeMenu')}>
        <Image
          style={styles.button}
          source={icon}
        />
      </TouchableHighlight>
    )
  }

  getMenuView () {
    const resetIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.onResetPressed.bind(this)}>
        <Image
          style={styles.button}
          source={require('../img/refresh.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon = this.getLifeIcon(this.props.store.lifeTotal)

    const numPlayersIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.transitionMenu.bind(this, 'playersMenu')}>
        <Image
          style={styles.button}
          source={require('../img/users.png')}
        />
      </TouchableHighlight>
    )

    const paintCanIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.onChangeBackgroundPressed.bind(this)}>
        <Image
          style={styles.button}
          source={require('../img/paintCan.png')}
        />
      </TouchableHighlight>
    )

    const rollDiceIcon = (
      <TouchableHighlight hitSlop={MenuBar.hitSlop} onPress={this.onDiceRollPressed.bind(this)}>
        <Image
          style={styles.button}
          source={require('../img/dice5.png')}
        />
      </TouchableHighlight>
    )

    switch (this.state.menuType) {
      case 'lifeMenu':
        return this.getLifeTotalMenu()
      case 'playersMenu':
        return this.getPlayersMenu()
      default:
        return (
          <Animatable.View ref='menuBar' style={styles.container}>
            {paintCanIcon}
            {numPlayersIcon}
            {lifeIcon}
            {rollDiceIcon}
            {resetIcon}
          </Animatable.View>
        )
    }
  }

  render () {
    return this.getMenuView()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .15,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
  },
})