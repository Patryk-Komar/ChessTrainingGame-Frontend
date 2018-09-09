import Piece from "./piece";

export class Pawn extends Piece {

    getType(): string {
        return "pawn";
    }

    showPossibleMoves(currentField: number, fields: Array <Piece>): Array <number> {
        const possibleMoves = [];
        const row = Math.floor(currentField / 8);
        const column = currentField % 8;

        if (this.color === "white") {
            if (row === 0) {
                return possibleMoves;
            } else {
                if (column > 0) {
                    const upperLeftFieldNumber = currentField - 9;
                    if (fields[upperLeftFieldNumber] !== null && fields[upperLeftFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(upperLeftFieldNumber);
                    }
                }
                const upperFieldNumber = currentField - 8;
                if (fields[upperFieldNumber] === null) {
                    possibleMoves.push(upperFieldNumber);
                }
                if (row === 6) {
                    const doubleUpperFieldNumber = currentField - 16;
                    if (fields[doubleUpperFieldNumber] === null) {
                        possibleMoves.push(doubleUpperFieldNumber);
                    }
                }
                if (column < 7) {
                    const upperRightFieldNumber = currentField - 7;
                    if (fields[upperRightFieldNumber] !== null && fields[upperRightFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(upperRightFieldNumber);
                    }
                }
            }
        } else {
            if (row === 7) {
                return possibleMoves;
            } else {
                if (column > 0) {
                    const lowerLeftFieldNumber = currentField + 7;
                    if (fields[lowerLeftFieldNumber] !== null && fields[lowerLeftFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(lowerLeftFieldNumber);
                    }
                }
                const lowerFieldNumber = currentField + 8;
                if (fields[lowerFieldNumber] === null) {
                    possibleMoves.push(lowerFieldNumber);
                }
                if (row === 1) {
                    const doubleLowerFieldNumber = currentField + 16;
                    if (fields[lowerFieldNumber] === null && fields[doubleLowerFieldNumber] === null) {
                        possibleMoves.push(doubleLowerFieldNumber);
                    }
                }
                if (column < 7) {
                    const lowerRightFieldNumber = currentField + 9;
                    if (fields[lowerRightFieldNumber] !== null && fields[lowerRightFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(lowerRightFieldNumber);
                    }
                }
            }
        }
        return possibleMoves;
    }

    prepareAssetsURL(): string {
        return `../../../assets/pieces/pawn-${this.color}.png`;
    }

    prepareAlternativeDescription(): string {
        return `Pawn (${this.color})`;
    }

}

export default Pawn;
