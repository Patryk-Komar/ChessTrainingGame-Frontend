import OneMoveCheckmate from "../models/game/game-modes/one.move.checkmate";
import TwoMovesCheckmate from "../models/game/game-modes/two.moves.checkmate";
import ThreeMovesCheckmate from "../models/game/game-modes/three.moves.checkmate";
import Stalemate from "../models/game/game-modes/stalemate";
import DoubleAttack from "../models/game/game-modes/double.attack";

const gameModesMapping = {

    oneMoveCheckmate: OneMoveCheckmate,
    twoMovesCheckmate: TwoMovesCheckmate,
    threeMovesCheckmate: ThreeMovesCheckmate,
    stalemate: Stalemate,
    doubleAttack: DoubleAttack

};

export default gameModesMapping;
