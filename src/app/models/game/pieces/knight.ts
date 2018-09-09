import Piece from "./piece";

class Knight extends Piece {

    getType(): string {
        return "knight";
    }

    showPossibleMoves(currentField: number, fields: Array <Piece>): Array <number> {
        const possibleMoves = [];
        const row = Math.floor(currentField / 8);
        const column = currentField % 8;

        if (row > 0 && column > 1) {
            const upperLeftFieldNumber = currentField - 10;
            if (fields[upperLeftFieldNumber] === null || fields[upperLeftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperLeftFieldNumber);
            }
        }
        if (row > 1 && column > 0) {
            const upperLeftFieldNumber = currentField - 17;
            if (fields[upperLeftFieldNumber] === null || fields[upperLeftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperLeftFieldNumber);
            }
        }
        if (row > 1 && column < 7) {
            const upperRightFieldNumber = currentField - 15;
            if (fields[upperRightFieldNumber] === null || fields[upperRightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperRightFieldNumber);
            }
        }
        if (row > 0 && column < 6) {
            const upperRightFieldNumber = currentField - 6;
            if (fields[upperRightFieldNumber] === null || fields[upperRightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperRightFieldNumber);
            }
        }
        if (row < 7 && column < 6) {
            const lowerRightFieldNumber = currentField + 10;
            if (fields[lowerRightFieldNumber] === null || fields[lowerRightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerRightFieldNumber);
            }
        }
        if (row < 6 && column < 7) {
            const lowerRightFieldNumber = currentField + 17;
            if (fields[lowerRightFieldNumber] === null || fields[lowerRightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerRightFieldNumber);
            }
        }
        if (row < 6 && column > 0) {
            const lowerLeftFieldNumber = currentField + 15;
            if (fields[lowerLeftFieldNumber] === null || fields[lowerLeftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerLeftFieldNumber);
            }
        }
        if (row < 7 && column > 1) {
            const lowerLeftFieldNumber = currentField + 6;
            if (fields[lowerLeftFieldNumber] === null || fields[lowerLeftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerLeftFieldNumber);
            }
        }
        return possibleMoves;
    }

    prepareAssetsURL(): string {
        return `../../../assets/pieces/knight-${this.color}.png`;
    }

    prepareAlternativeDescription(): string {
        return `Knight (${this.color})`;
    }

}

export default Knight;
