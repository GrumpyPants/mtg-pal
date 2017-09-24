/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './components/App'
import KeepAwake from 'react-native-keep-awake'

class Root extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    KeepAwake.activate()
  }

  componentWillUnmount () {
    KeepAwake.deactivate()
  }

  render() {
    return (<App />)
  }
}

Root.defaultProps = {
  ...App.defaultProps,
  instructions: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
}

AppRegistry.registerComponent('App', () => Root)
