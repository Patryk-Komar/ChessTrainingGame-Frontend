export class PlayerScores {

    private scores: Object = {
        oneMoveCheckmate: {
            levels: 0,
            completed: 0
        },
        twoMovesCheckmate: {
            levels: 0,
            completed: 0
        },
        threeMovesCheckmate: {
            levels: 0,
            completed: 0
        },
        stalemate: {
            levels: 0,
            completed: 0
        },
        doubleAttack: {
            levels: 0,
            completed: 0
        }
    }

    private achievements: Object = {
        oneMoveCheckmate: false,
        twoMovesCheckmate: false,
        threeMovesCheckmate: false,
        stalemate: false,
        doubleAttack: false,
    }

    constructor(playerScoresObject) {
        const {
            scores,
            achievements
        } = playerScoresObject;
        for (const property in scores) {
            this.scores[property].levels = scores[property].levels;
            this.scores[property].completed = scores[property].completed;
        }
        for (const property in achievements) {
            this.achievements[property] = achievements[property];
        }
    }

    public incrementScore(gameMode: string): void {
        this.scores[gameMode].completed++;
        if (this.scores[gameMode].completed === this.scores[gameMode].completed) {
            this.achievements[gameMode] = true;
        }
    }

}
