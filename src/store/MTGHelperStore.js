import {observable} from 'mobx'
import droll from 'droll'

let index = 0

class MTGHelperStore {
  @observable players = [{name: 'Player 1', life: 20, roll: null}, {name: 'Player 2', life: 20, roll: null}]
  @observable lifeTotal = 20

  @observable isRollingDiceViewVisible = false
  @observable isRollingDiceAnimationActive = false

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
          life: 20,
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

  rollDice () {
    if (this.isRollingDiceAnimationActive) {
      return
    }

    this.isRollingDiceViewVisible = true
    this.isRollingDiceAnimationActive = true
    this.clearDiceRoll()

    let isSingleWinner = false
    while(!isSingleWinner) {
      const result = droll.roll(this.players.length + 'd6');
      const winner = Math.max.apply(Math, result.rolls)
      const count = result.rolls.reduce(function(n, val) {
        return n + (val === winner);
      }, 0);

      if (count === 1) {
        isSingleWinner = true
        result.rolls.forEach((roll, index) => {
          this.players[index].roll = roll
        })
        this.players[result.rolls.indexOf(winner)].winner = true
      }
    }
  }

  clearDiceRoll () {
    this.players.forEach((player) => {
      player.roll = null
      player.winner = null
    })
  }
}


const mtgHelperStore = new MTGHelperStore()
export default mtgHelperStore