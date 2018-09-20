import Article from "../utils/article";
import { WebsiteService } from '../services/website.service';

class ArticlesManager {

    private static manager: ArticlesManager;
    private articles: Array <Article>;

    private constructor(private websiteService: WebsiteService) {
        this.articles = [];
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getAllArticles();
    }

    public static getInstance(): ArticlesManager {
        return this.manager || (this.manager = new ArticlesManager(new WebsiteService()));
    }

    private getAllArticles(): void {
        this.websiteService.getAllThematicArticles()
        .then(response => {
            if (response.success) {
                const {
                    articles
                } = response;
                for (const article of articles) {
                    const {
                        category,
                        title,
                        content
                    } = article;
                    this.articles.push(new Article(category, title, content));
                }
            }
        })
    }

    public getArticlesByCategory(category: string): Array <Article> {
        const articles = [];
        for (const article of this.articles) {
            if (article.getCategory() === category) {
                articles.push(article);
            }
        }
        return articles;
    }

    public getArticleByTitle(title: string): Article {
        for (const article of this.articles) {
            if (article.getTitle() === title) {
                return article;
            }
        }
        return null;
    }

}

export default ArticlesManager;
