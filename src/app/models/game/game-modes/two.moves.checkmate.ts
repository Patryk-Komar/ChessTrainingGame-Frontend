import GameMode from "./game.mode";
import Solution from "../solution";
import Move from "../move";

class TwoMovesCheckmate extends GameMode {

    constructor(id?: number, chessboardString?: Array <string>, color?: string, solutionsString?: string) {
        super(id, chessboardString, color);
        this.solutions = [];
        const solutions = solutionsString.split(",");
        for (let solutionString of solutions) {
            const [
                fieldOne,
                fieldTwo,
                fieldThree
            ] = solutionString.split("-");
            const moves = [];
            moves.push(new Move(parseInt(fieldOne), parseInt(fieldTwo)));
            moves.push(new Move(parseInt(fieldTwo), parseInt(fieldThree)));
            const solution = new Solution(moves);
            this.solutions.push(solution);
        }
    }
    
    public validateMove(move: Move): boolean {
        return false;
    }

    public isFinished(): boolean {
        return false;
    }

}

export default TwoMovesCheckmate;
