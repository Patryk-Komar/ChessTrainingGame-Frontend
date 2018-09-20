import Piece from "./piece";

class King extends Piece {

    getType(): string {
        return "king";
    }

    showPossibleMoves(currentField: number, fields: Array <Piece>): Array <number> {
        const possibleMoves = [];
        if (currentField > 7 && currentField % 8 !== 0) {
            const upperLeftFieldNumber = currentField - 9;
            if (fields[upperLeftFieldNumber] === null || fields[upperLeftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperLeftFieldNumber);
            }
        }
        if (currentField > 7) {
            const upperFieldNumber = currentField - 8;
            if (fields[upperFieldNumber] === null || fields[upperFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperFieldNumber);
            }
        }
        if (currentField > 7 && currentField % 8 !== 7) {
            const upperRightFieldNumber = currentField - 7;
            if (fields[upperRightFieldNumber] === null || fields[upperRightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(upperRightFieldNumber);
            }
        }
        if (currentField % 8 !== 0) {
            const leftFieldNumber = currentField - 1;
            if (fields[leftFieldNumber] === null || fields[leftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(leftFieldNumber);
            }
        }
        if (currentField % 8 !== 7) {
            const rightFieldNumber = currentField + 1;
            if (fields[rightFieldNumber] === null || fields[rightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(rightFieldNumber);
            }
        }
        if (currentField < 56 && currentField % 8 !== 0) {
            const lowerLeftFieldNumber = currentField + 7;
            if (fields[lowerLeftFieldNumber] === null || fields[lowerLeftFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerLeftFieldNumber);
            }
        }
        if (currentField < 56) {
            const lowerFieldNumber = currentField + 8;
            if (fields[lowerFieldNumber] === null || fields[lowerFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerFieldNumber);
            }
        }
        if (currentField < 56 && currentField % 8 !== 7) {
            const lowerRightFieldNumber = currentField + 9;
            if (fields[lowerRightFieldNumber] === null || fields[lowerRightFieldNumber].getColor() !== this.getColor()) {
                possibleMoves.push(lowerRightFieldNumber);
            }
        }
        return possibleMoves;
    }

    prepareAssetsURL(): string {
        return `../../../assets/pieces/king-${this.color}.png`;
    }

    prepareAlternativeDescription(): string {
        return `King (${this.color})`;
    }

}

export default King;
