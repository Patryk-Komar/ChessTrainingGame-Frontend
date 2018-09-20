export class Quotation {

    private content: string;
    private author: string;

    constructor(content?: string, author?: string) {
        this.content = content ? content : "";
        this.author = author ? author : "";
    }

    public getContent(): string {
        return this.content;
    }

    public getAuthor(): string {
        return this.author;
    }

}

const quotations: Array <Quotation> = [];

quotations.push(new Quotation("I have come to the personal conclusion that while all artists are not chess players, all chess players are artists.", "Marcel Duchamp"));
quotations.push(new Quotation("Unlike other games in which lucre is the end and aim, [chess] recommends itself to the wise by the fact that its mimic battles are fought for no prize but honour. It is eminently and emphatically the philosopher’s game.", "Paul Morphy"));
quotations.push(new Quotation("The beauty of chess is it can be whatever you want it to be. It transcends language, age, race, religion, politics, gender and socioeconomic background. Whatever your circumstances, anyone can enjoy a good fight to the death over the chess board.", "Simon Williams"));
quotations.push(new Quotation("Chess is the struggle against the error.", "Johannes Zukertort"));
quotations.push(new Quotation("Every chess master was once a beginner.", "Irving Chernev"));
quotations.push(new Quotation("Avoid the crowd. Do your own thinking independently. Be the chess player, not the chess piece.", "Ralph Charell"));
quotations.push(new Quotation("Chess makes man wiser and clear-sighted.", "Vladimir Putin"));
quotations.push(new Quotation("Chess is the gymnasium of the mind.", "Blaise Pascal"));
quotations.push(new Quotation("Chess holds its master in its own bonds, shackling the mind and brain so that the inner freedom of the very strongest must suffer.", "Albert Einstein"));
quotations.push(new Quotation("Chess is war over the board. The object is to crush the opponent’s mind.", "Bobby Fischer"));
quotations.push(new Quotation("I am convinced, the way one plays chess always reflects the player’s personality. If something defines his character, then it will also define his way of playing.", "Vladimir Kramnik"));
quotations.push(new Quotation("The game of chess is not merely an idle amusement. Several very valuable qualities of the mind, useful in the course of human life, are to be acquired or strengthened by it… For Life is a kind of Chess, in which we have often points to gain, and competitors or adversaries to contend with.", "Benjamin Franklin"));
quotations.push(new Quotation("As proved by evidence, [chess is] more lasting in its being and presence than all books and achievements; the only game that belongs to all people and all ages; of which none knows the divinity that bestowed it on the world, to slay boredom, to sharpen the senses, to exhilarate the spirit.", "Stefan Zweig"));
quotations.push(new Quotation("Chess doesn’t drive people mad, it keeps mad people sane.", "Bill Hartston"));
quotations.push(new Quotation("In life, as in chess, one’s own pawns block one’s way.  A man’s very wealthy, ease, leisure, children, books, which should help him to win, more often checkmate him.", "Charles Buxton"));
quotations.push(new Quotation("Chess is life in miniature. Chess is struggle, chess is battles.", "Garry Kasparov"));
quotations.push(new Quotation("Chess, like love, like music, has the power to make men happy.", "Siegbert Tarrasch"));
quotations.push(new Quotation("For in the idea of chess and the development of the chess mind we have a picture of the intellectual struggle of mankind.", "Richard Réti"));

export default quotations;
