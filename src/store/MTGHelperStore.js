import {observable} from 'mobx'
import immutable from 'immutable'

let index = 0

class MTGHelperStore {
  @observable players = [{name: 'Player 1', life: 20}, {name: 'Player 2', life: 20}]
  @observable lifeTotal = 20

  setNumPlayers (numPlayers) {
    if (numPlayers === this.players.length) return

    if (numPlayers < this.players.length) {
      this.players = this.players.slice(0, numPlayers)
    }
    else {
      const playerDelta = numPlayers - this.players.length
      const newPlayers = []
      for (let i = 0; i < playerDelta; i++) {
        const playerNum = this.players.length + i + 1
        newPlayers.push({
          name: 'Player ' + playerNum,
          life: 20
        })
      }
      this.players = this.players.concat(newPlayers)
    }

    this.resetLifeTotals()
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