import '../node_modules/cm-chessboard-ts/assets/styles/cm-chessboard.css'
import {Chessboard, COLOR, INPUT_EVENT_TYPE} from 'cm-chessboard-ts'
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

function startGame(){
  whiteRound()
}

function whiteRound(){
  playerColor = 'Blanc'
  let moves: string | any[] = []
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
          if (moves[i].includes(moveTo)){
            board.movePiece(event.squareFrom, moveTo)
            chess.move(moves[i])
            validate = true
          }
        }
        if (validate) {
          board.disableMoveInput()
          blackRound()
          return true
        }
    }
  }, COLOR.white)
}

function blackRound(){
  playerColor = 'Noir'
  let moves: string | any[] = []
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
          if (moves[i].includes(moveTo)){
            board.movePiece(event.squareFrom, moveTo)
            chess.move(moves[i])
            validate = true
          }
        }
        if (validate) {
          board.disableMoveInput()
          whiteRound()
          return true
        }
    }
  }, COLOR.black)
}

startGame()
/*while (!chess.gameOver()) {
  const moves = chess.moves()
  const move = moves[Math.floor(Math.random() * moves.length)]
  chess.move(move)
}
console.log(chess.pgn())

//N = cavalier
//B = fou
//R = tour
//K = roi
//Q = reine
//rien = pion*/