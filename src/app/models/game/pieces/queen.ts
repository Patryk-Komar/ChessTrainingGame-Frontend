import Piece from "./piece";

class Queen extends Piece {

    getType(): string {
        return "queen";
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
            if (row - i >= 0 && column - i >= 0) {
                let upperLeftFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const upperLeftFieldNumber = currentField - (j * 9);
                    if (fields[upperLeftFieldNumber] !== null) {
                        upperLeftFieldsClear = false;
                    }
                }
                if (upperLeftFieldsClear) {
                    const upperLeftFieldNumber = currentField - (i * 9);
                    if (fields[upperLeftFieldNumber] === null || fields[upperLeftFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(upperLeftFieldNumber);
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
            if (row - i >= 0 && column + i < 8) {
                let upperRightFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const upperRightFieldNumber = currentField - (j * 7);
                    if (fields[upperRightFieldNumber] !== null) {
                        upperRightFieldsClear = false;
                    }
                }
                if (upperRightFieldsClear) {
                    const upperRightFieldNumber = currentField - (i * 7);
                    if (fields[upperRightFieldNumber] === null || fields[upperRightFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(upperRightFieldNumber);
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
            if (row + i < 8 && column + i < 8) {
                let lowerRightFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const lowerRightFieldNumber = currentField + (j * 9);
                    if (fields[lowerRightFieldNumber] !== null) {
                        lowerRightFieldsClear = false;
                    }
                }
                if (lowerRightFieldsClear) {
                    const lowerRightFieldNumber = currentField + (i * 9);
                    if (fields[lowerRightFieldNumber] === null || fields[lowerRightFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(lowerRightFieldNumber);
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
            if (row + i < 8 && column - i >= 0) {
                let lowerLeftFieldsClear = true;
                for (let j = 1; j < i; j++) {
                    const lowerLeftFieldNumber = currentField + (j * 7);
                    if (fields[lowerLeftFieldNumber] !== null) {
                        lowerLeftFieldsClear = false;
                    }
                }
                if (lowerLeftFieldsClear) {
                    const lowerLeftFieldNumber = currentField + (i * 7);
                    if (fields[lowerLeftFieldNumber] === null || fields[lowerLeftFieldNumber].getColor() !== this.getColor()) {
                        possibleMoves.push(lowerLeftFieldNumber);
                    }
                }
            }
        }
        return possibleMoves;
    }

    prepareAssetsURL(): string {
        return `../../../assets/pieces/queen-${this.color}.png`;
    }

    prepareAlternativeDescription(): string {
        return `Queen (${this.color})`;
    }

}

export default Queen;
