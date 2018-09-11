import Piece from "./pieces/piece";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";

import piecesMapping from "../../config/pieces.mapping";

class Chessboard {

    public fields: Array <Piece>;

    constructor(fieldsArray?: Array <string>) {
        if (fieldsArray.length === 64) {
            this.fields = [];
            for (let fieldString of fieldsArray) {
                if (fieldString === "-") {
                    this.fields.push(null);
                } else {
                    const [
                        color,
                        piece
                    ] = fieldString.split("-");
                    const pieceClass = piecesMapping[piece];
                    const pieceObject = new pieceClass(color);
                    this.fields.push(pieceObject);
                }
            }
        } else {
            this.prepareBasicChessboard();
        }
    }

    private prepareBasicChessboard() {
        this.fields = [
            new Rook("black"),
            new Knight("black"),
            new Bishop("black"),
            new Queen("black"),
            new King("black"),
            new Bishop("black"),
            new Knight("black"),
            new Rook("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("black"),
            new Pawn("white"),
            new Pawn("white"),
            new Pawn("white"),
            new Pawn("white"),
            new Pawn("white"),
            new Pawn("white"),
            new Pawn("white"),
            new Pawn("white"),
            new Rook("white"),
            new Knight("white"),
            new Bishop("white"),
            new Queen("white"),
            new King("white"),
            new Bishop("white"),
            new Knight("white"),
            new Rook("white")
        ];

        while (this.fields.length < 64) {
            this.fields.splice(16, 0, null);
        }
    }

}

export default Chessboard;
