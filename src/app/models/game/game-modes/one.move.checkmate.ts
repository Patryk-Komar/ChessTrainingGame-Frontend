import GameMode from "./game.mode";
import Solution from "../solution";
import Move from "../move";

class OneMoveCheckmate extends GameMode {

    constructor(id?: number, chessboardString?: Array <string>, color?: string, solutionsString?: string) {
        super(id, chessboardString, color);
        this.solutions = [];
        const solutions = solutionsString.split(",");
        for (let solutionString of solutions) {
            const [
                fieldOne,
                fieldTwo
            ] = solutionString.split("-");
            const moves = [];
            moves.push(new Move(parseInt(fieldOne), parseInt(fieldTwo)));
            const solution = new Solution(moves);
            this.solutions.push(solution);
        }
    }

    public validateMove(move: Move): boolean {
        const from = move.getFrom();
        const to = move.getTo();
        for (let solution of this.solutions) {
            const correctMove = solution.getMoves()[this.correctMovesCounter];
            if (from === correctMove.getFrom() && to === correctMove.getTo()) {
                this.correctMovesCounter++;
                return true;
            }
        }
        this.mistakesCounter++;
        return false;
    }

    public isFinished(): boolean {
        return this.correctMovesCounter === 1;
    }

}

export default OneMoveCheckmate;
