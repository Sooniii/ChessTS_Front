import '../node_modules/cm-chessboard-ts/assets/styles/cm-chessboard.css'
import {Chessboard, COLOR, INPUT_EVENT_TYPE} from 'cm-chessboard-ts'
import {Chess} from 'chess.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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

board.enableMoveInput((event) => {
  switch (event.type) {
    case INPUT_EVENT_TYPE.moveInputStarted:
      console.log(`moveInputStarted: ${event.square}`)
      return true
    case INPUT_EVENT_TYPE.validateMoveInput:
      chess.move()
      console.log(`validateMoveInput: ${event.squareFrom}-${event.squareTo}`)
      return true
    case INPUT_EVENT_TYPE.moveInputCanceled:
      console.log(`moveInputCanceled`)
  }
}, COLOR.white)

board.enableMoveInput((event) => {
  switch (event.type) {
    case INPUT_EVENT_TYPE.moveInputStarted:
      console.log(`moveInputStarted: ${event.square}`)
      return true
    case INPUT_EVENT_TYPE.validateMoveInput:
      console.log(`validateMoveInput: ${event.squareFrom}-${event.squareTo}`)
      return true
    case INPUT_EVENT_TYPE.moveInputCanceled:
      console.log(`moveInputCanceled`)
  }
}, COLOR.black)

/*while (!chess.gameOver()) {
  const moves = chess.moves()
  const move = moves[Math.floor(Math.random() * moves.length)]
  chess.move(move)
}
console.log(chess.pgn())*/