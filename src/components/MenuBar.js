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

import * as Animatable from 'react-native-animatable';

import Settings from './Settings'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuBar extends Component {

  static propTypes = {
    onSetLifeTotal: React.PropTypes.func.isRequired, // handler for when the life total changes
  }

  static defaultProps = {
    showNumPlayersMenu: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      showLifeMenu: false,
      showNumPlayersMenu: false,
    }
  }

  onSettingsPressed () {
    console.log('TODO: open settings')
    this.props.navigator.push({
      name: 'Settings',
      id: 'settings',
      component: Settings
    });
  }

  transitionMenu (menuType) {
    const menuBar = this.refs.menuBar
    const _this = this

    this.refs.menuBar.slideOutRight(200)
      .then(() => {
        _this.setState({menuType})
        menuBar.slideInLeft(200)
      })
  }

  onDiceRollPressed () {
    console.log('TODO: roll em')
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
    this.props.store.resetLifeTotals()
  }

  setLifeTotal (lifeTotal) {
    this.props.store.setAllPlayersLife(lifeTotal)
    this.onBackToMainMenuPressed('lifeMenu')
  }

  getLifeTotalMenu () {
    const backIcon = (<Icon name="arrow-left" size={30} color="white" onPress={this.onBackToMainMenuPressed.bind(this, 'lifeMenu')}/>)

    const lifeIcon20 = (
      <TouchableHighlight onPress={this.setLifeTotal.bind(this, 20)}>
        <Image
          style={styles.button}
          source={require('../img/20-health.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon30 = (
      <TouchableHighlight onPress={this.setLifeTotal.bind(this, 30)}>
        <Image
          style={styles.button}
          source={require('../img/30-health.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon40 = (
      <TouchableHighlight onPress={this.setLifeTotal.bind(this, 40)}>
        <Image
          style={styles.button}
          source={require('../img/40-health.png')}
        />
      </TouchableHighlight>
    )

    const lifeIcon50 = (
      <TouchableHighlight onPress={this.setLifeTotal.bind(this, 50)}>
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
    this.props.store.setNumPlayers(numPlayers)
  }

  getPlayersMenu () {
    const backIcon = (<Icon name="arrow-left" size={30} color="white" onPress={this.onBackToMainMenuPressed.bind(this, 'playersMenu')}/>)
    const twoPlayerIcon = (
      <TouchableHighlight onPress={this.onChangeNumPlayersPressed.bind(this, 2)}>
        <Image
          style={styles.button}
          source={require('../img/2Players.png')}
        />
      </TouchableHighlight>
    )

    const threePlayerIcon = (
      <TouchableHighlight onPress={this.onChangeNumPlayersPressed.bind(this, 3)}>
        <Image
          style={styles.button}
          source={require('../img/3Players.png')}
        />
      </TouchableHighlight>
    )

    const fourPlayerIcon = (
      <TouchableHighlight onPress={this.onChangeNumPlayersPressed.bind(this, 4)}>
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

  getMenuView () {
    const settingsIcon = (<Icon name="cog" size={30} color="white" onPress={this.onSettingsPressed.bind(this)}/>)
    const numPlayersIcon = (<Icon name="users" size={30} color="white" onPress={this.transitionMenu.bind(this, 'playersMenu')}/>)
    const lifeIcon = (<Icon name="heart" size={30} color="white" onPress={this.transitionMenu.bind(this, 'lifeMenu')}/>)
    const resetIcon = (<Icon name="refresh" size={30} color="white" onPress={this.onResetPressed.bind(this)}/>)

    const rollDiceIcon = (
      <TouchableHighlight onPress={this.onDiceRollPressed}>
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
            {settingsIcon}
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