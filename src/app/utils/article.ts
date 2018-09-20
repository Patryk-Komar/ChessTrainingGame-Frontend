export default class Article {

    constructor(private category: string, private title: string, private content: string) { }

    public getCategory(): string {
        return this.category;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

}
