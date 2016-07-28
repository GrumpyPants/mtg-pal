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
  StatusBar,
} from 'react-native'

import {observer} from 'mobx-react/native'

import Counter from './Counter'
import MenuBar from './MenuBar'

@observer
export default class FourPlayerBoard extends Component {

  static propTypes = {

  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
  }

  onSetLifeTotal (lifeTotal) {
    this.setState({lifeTotal})
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <View style={styles.upperContainer}>
          <View style={styles.cardContainer}>
            <Counter min={0} player={this.props.store.players[2]} stepValue={1} facing="left"/>
          </View>

          <View style={styles.cardContainer}>
            <Counter min={0} player={this.props.store.players[3]} stepValue={1} facing="right"/>
          </View>
        </View>

        <MenuBar style={styles.menuBar} navigator={this.props.navigator} store={this.props.store} onSetLifeTotal={this.onSetLifeTotal.bind(this)}/>

        <View style={styles.lowerContainer}>
          <View style={styles.cardContainer}>
            <Counter min={0} player={this.props.store.players[0]} stepValue={1} facing="left"/>
          </View>

          <View style={styles.cardContainer}>
            <Counter min={0} player={this.props.store.players[1]} stepValue={1} facing="right"/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
  },
  cardContainer: {
    flex: 1,
    borderWidth: 1,
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
  },
  lifeTotal: {
    fontSize: 120,
  },
  menuBar: {
    backgroundColor: 'black',
    borderWidth: 1,
    position: 'absolute'
  },
})