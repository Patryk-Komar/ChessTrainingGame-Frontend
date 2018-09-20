import Chessboard from "../chessboard";
import Solution from "../solution";
import Move from "../move";

abstract class GameMode {

    protected id: number;
    protected chessboard: Chessboard;
    protected color: string;
    protected solutions: Array <Solution>;
    protected correctMovesCounter: number;
    protected mistakesCounter: number;

    constructor(id?: number, chessboardString?: Array <string>, color?: string) {
        this.id = id > 0 ? id : 1;
        this.chessboard = chessboardString ? new Chessboard(chessboardString) : new Chessboard();
        this.color = color === "white" || color === "black" ? color : "white";
        this.correctMovesCounter = 0;
        this.mistakesCounter = 0;
    }

    public getID(): number {
        return this.id;
    }
    
    public getChessboard(): Chessboard {
        return this.chessboard;
    }

    public getColor(): string {
        return this.color;
    }

    public getSolutions(): Array <Solution> {
        return this.solutions;
    }

    public getCorrectMovesCounter(): number {
        return this.correctMovesCounter;
    }

    public getMistakesCounter(): number {
        return this.mistakesCounter;
    }

    public abstract validateMove(move: Move): boolean;

    public abstract isFinished(): boolean;

}

export default GameMode;
