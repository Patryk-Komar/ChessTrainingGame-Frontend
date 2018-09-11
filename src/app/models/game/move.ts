class Move {

    private from: number;
    private to: number;

    constructor(from?: number, to?: number) {
        this.from = from >= 0 && from < 64 && from !== to ? from : -1;
        this.to = to >= 0 && to < 64 && from !== to ? to : -1;
    }

    public getFrom(): number {
        return this.from;
    }

    public getTo(): number {
        return this.to;
    }

}

export default Move;
