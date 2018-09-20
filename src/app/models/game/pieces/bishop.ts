import Piece from "./piece";

export class Bishop extends Piece {

    getType(): string {
        return "bishop";
    }

    showPossibleMoves(currentField: number, fields: Array <Piece>): Array <number> {
        const possibleMoves = [];
        const row = Math.floor(currentField / 8);
        const column = currentField % 8;

        for (let i = 1; i < 8; i++) {
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
        }
        return possibleMoves;
    }

    prepareAssetsURL(): string {
        return `../../../assets/pieces/bishop-${this.color}.png`;
    }

    prepareAlternativeDescription(): string {
        return `Bishop (${this.color})`;
    }

}

export default Bishop;
