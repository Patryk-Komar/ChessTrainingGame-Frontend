export default class Article {

    constructor(private title: string, private content: string) { }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

}
