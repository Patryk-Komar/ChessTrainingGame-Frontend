import GameMode from "./game.mode";
import Solution from "../solution";
import Move from "../move";

class DoubleAttack extends GameMode {

    constructor(id?: number, chessboardString?: Array <string>, color?: string, solutionsString?: string) {
        super(id, chessboardString, color);
    }
    
    public validateMove(move: Move): boolean {
        return false;
    }

    public isFinished(): boolean {
        return false;
    }

}

export default DoubleAttack;
