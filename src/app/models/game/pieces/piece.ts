import Chessboard from "../chessboard";

abstract class Piece {

    protected color: string;

    constructor(color: string) {
        this.color = color === "white" || color === "black" ? color : "white";
    }

    public getColor(): string {
        return this.color;
    }
    
    public abstract getType(): string;

    public abstract showPossibleMoves(currentField: number, fields: Array <Piece>): Array <number>;

    public abstract prepareAssetsURL(): string;

    public abstract prepareAlternativeDescription(): string;

}

export default Piece;
