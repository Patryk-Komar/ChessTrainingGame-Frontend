import Chessboard from "../chessboard";

abstract class Piece {

    protected color: string;
    protected fieldNumber: number;

    constructor(color: string, fieldNumber: number) {
        this.color = color === "white" || color === "black" ? color : "white";
        this.fieldNumber = Number.isInteger(fieldNumber) && fieldNumber >= 0 && fieldNumber < 64 ? fieldNumber : 0;
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
