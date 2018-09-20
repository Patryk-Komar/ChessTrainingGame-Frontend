import Bishop from "../models/game/pieces/bishop";
import King from "../models/game/pieces/king";
import Knight from "../models/game/pieces/knight";
import Pawn from "../models/game/pieces/pawn";
import Queen from "../models/game/pieces/queen";
import Rook from "../models/game/pieces/rook";

const piecesMapping = {

    bishop: Bishop,
    king: King,
    knight: Knight,
    pawn: Pawn,
    queen: Queen,
    rook: Rook

};

export default piecesMapping;
