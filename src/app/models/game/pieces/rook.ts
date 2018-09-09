import Piece from "./piece";

class Rook extends Piece {

    getType(): string {
        return "rook";
    }

    showPossibleMoves(currentField: number, fields: Array <Piece>): Array <number> {
        const possibleMoves = [];
        const row = Math.floor(currentField / 8);
        const column = currentField % 8;

        for (let i = 1; i < 8; i++) {
            if (column - i >= 0) {
                let leftFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const leftFieldNumber = currentField - j;
                    if (fields[leftFieldNumber] !== null) {
                        leftFieldsClear = false;
                    }
                }
                if (leftFieldsClear) {
                    const leftFieldNumber = currentField - i;
                    if (fields[leftFieldNumber] === null || fields[leftFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(leftFieldNumber);
                    }
                }
            }
            if (row - i >= 0) {
                let upperFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const upperFieldNumber = currentField - 8 * j;
                    if (fields[upperFieldNumber] !== null) {
                        upperFieldsClear = false;
                    }
                }
                if (upperFieldsClear) {
                    const upperFieldNumber = currentField - 8 * i;
                    if (fields[upperFieldNumber] === null || fields[upperFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(upperFieldNumber);
                    }
                }
            }
            if (column + i <= 7) {
                let rightFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const rightFieldNumber = currentField + j;
                    if (fields[rightFieldNumber] !== null) {
                        rightFieldsClear = false;
                    }
                }
                if (rightFieldsClear) {
                    const rightFieldNumber = currentField + i;
                    if (fields[rightFieldNumber] === null || fields[rightFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(rightFieldNumber);
                    }
                }
            }
            if (row + i <= 7) {
                let lowerFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const lowerFieldNumber = currentField + 8 * j;
                    if (fields[lowerFieldNumber] !== null) {
                        lowerFieldsClear = false;
                    }
                }
                if (lowerFieldsClear) {
                    const lowerFieldNumber = currentField + 8 * i;
                    if (fields[lowerFieldNumber] === null || fields[lowerFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(lowerFieldNumber);
                    }
                }
            }
        }
        return possibleMoves;
    }

    prepareAssetsURL(): string {
        return `../../../assets/pieces/rook-${this.color}.png`;
    }

    prepareAlternativeDescription(): string {
        return `Rook (${this.color})`;
    }

}

export default Rook;
