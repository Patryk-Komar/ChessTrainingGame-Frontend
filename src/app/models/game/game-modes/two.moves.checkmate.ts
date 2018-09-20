import GameMode from "./game.mode";
import Solution from "../solution";
import Move from "../move";

class TwoMovesCheckmate extends GameMode {

    private enemyMoves: Array <Move>;
    private selectedSolution: number;

    constructor(id?: number, chessboardString?: Array <string>, color?: string, solutionsString?: string, enemyMovesString?: string) {
        super(id, chessboardString, color);
        this.solutions = [];
        const solutions = solutionsString.split(",");
        for (const solutionString of solutions) {
            const moves = [];
            const solutionMoves = solutionString.split(" -> ");
            for (const solutionMove of solutionMoves) {
                const [
                    fieldOne,
                    fieldTwo
                ] = solutionMove.split("-");
                moves.push(new Move(parseInt(fieldOne), parseInt(fieldTwo)));
            }
            const solution = new Solution(moves);
            this.solutions.push(solution);
        }
        this.enemyMoves = [];
        const enemyMoves = enemyMovesString.split(",");
        for (const enemyMoveString of enemyMoves) {
            const [
                fieldOne,
                fieldTwo
            ] = enemyMoveString.split("-");
            this.enemyMoves.push(new Move(parseInt(fieldOne), parseInt(fieldTwo)));
        }
    }
    
    public validateMove(move: Move): boolean {
        const from = move.getFrom();
        const to = move.getTo();
        if (this.correctMovesCounter === 0) {
            for (let i = 0; i < this.solutions.length; i++) {
                const correctMove = this.solutions[i].getMoves()[0];
                if (from === correctMove.getFrom() && to === correctMove.getTo()) {
                    this.selectedSolution = i;
                    this.correctMovesCounter++;
                    return true;
                }
            }
        } else {
            const solution = this.solutions[this.selectedSolution];
            const correctMove = solution.getMoves()[this.correctMovesCounter];
            if (from === correctMove.getFrom() && to === correctMove.getTo()) {
                this.correctMovesCounter++;
                return true;
            }
        }
        this.mistakesCounter++;
        return false;
    }

    public getEnemyMove(): Move {
        return this.enemyMoves[this.selectedSolution];
    }

    public isFinished(): boolean {
        return this.correctMovesCounter === 2;
    }

}

export default TwoMovesCheckmate;
