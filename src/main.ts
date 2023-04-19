import '../node_modules/cm-chessboard-ts/assets/styles/cm-chessboard.css'
import {Chessboard} from '../node_modules/cm-chessboard-ts/src/cm-chessboard/Chessboard.js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="chessContainer"></div>
`

let chessContainer = document.getElementById("chessContainer")

if (chessContainer) {
  new Chessboard(chessContainer), {position: "rn2k1r1/ppp1pp1p/3p2p1/5bn1/P7/2N2B2/1PPPPP2/2BNK1RR"}
}
