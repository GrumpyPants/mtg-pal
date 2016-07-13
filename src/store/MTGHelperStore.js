import {observable} from 'mobx'
import immutable from 'immutable'

let index = 0

class MTGHelperStore {
  @observable players = [{name: 'Player 1', life: 20}, {name: 'Player 2', life: 20}]
  @observable lifeTotal = 20

  setPlayers (numPlayers) {
    this.players.push({
      name: item,
      items: [],
      index
    })
    index++
  }

  setAllPlayersLife (life) {
    this.players.forEach((player) => {
      player.life = life
    })

    this.lifeTotal = life
  }

  resetLifeTotals () {
    this.players.forEach((player) => {
      player.life = this.lifeTotal
    })
  }
}


const mtgHelperStore = new MTGHelperStore()
export default mtgHelperStore