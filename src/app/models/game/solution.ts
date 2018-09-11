import Move from "./move";

class Solution {

    private moves: Array <Move>;

    constructor(moves: Array <Move>) {
        this.moves = moves.length > 0 ? moves : new Array(1).fill(new Move());
    }

    public getMoves(): Array <Move> {
        return this.moves;
    }

}

export default Solution;
