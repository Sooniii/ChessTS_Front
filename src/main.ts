import '../node_modules/cm-chessboard-ts/assets/styles/cm-chessboard.css'
import {Chessboard, Color, COLOR, INPUT_EVENT_TYPE} from 'cm-chessboard-ts'
import {Chess} from 'chess.ts'

let playerColor = 'Blanc'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<p>Aux ${playerColor} de jouer</p>
<div id="chessContainer"></div>
`

const chess = new Chess
const board = new Chessboard(document.getElementById("chessContainer") !, {
  position: 'start',
  sprite: {
    url: 'images/chessboard-sprite.svg',
    size : 40,
    cache : true
    },
  }
)

function startGame() {
  let playerColor = 'Blanc'
  let boardColor = COLOR.white
  playRound(playerColor, boardColor)
}

function playRound(playerColor:string, boardColor:Color) {
  if (chess.gameOver()) {
    board.destroy()
    return
  }
  let moves:string[] = []
  let validate = false
  board.enableMoveInput((event) => {
    switch (event.type) {
      case INPUT_EVENT_TYPE.moveInputStarted:
        moves = chess.moves({square: event.square})
        console.log(moves)
        return true
      case INPUT_EVENT_TYPE.validateMoveInput:
        const moveTo = event.squareTo
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].includes(moveTo)) {
            board.movePiece(event.squareFrom, moveTo)
            chess.move(moves[i])
            validate = true
          }
        }
        if (validate) {
          board.disableMoveInput()
          playerColor = (playerColor === 'Blanc') ? 'Noir' : 'Blanc'
          boardColor = (boardColor === COLOR.white) ? COLOR.black : COLOR.white
          playRound(playerColor, boardColor)
          return true
        }
    }
  }, boardColor)
}

startGame()