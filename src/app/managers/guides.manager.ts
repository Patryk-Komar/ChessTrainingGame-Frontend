import Guide from "../utils/guide";
import { WebsiteService } from '../services/website.service';

class GuidesManager {

    private static manager: GuidesManager;
    private guides: Array <Guide>;

    private constructor(private websiteService: WebsiteService) {
        this.guides = [];
        this.getAllGuides = this.getAllGuides.bind(this);
        this.getAllGuides();
    }

    public static getInstance(): GuidesManager {
        return this.manager || (this.manager = new GuidesManager(new WebsiteService()));
    }

    private getAllGuides(): void {
        this.websiteService.getAllGuides()
        .then(response => {
            if (response.success) {
                const {
                    guides
                } = response;
                for (const article of guides) {
                    const {
                        title,
                        content
                    } = article;
                    this.guides.push(new Guide(title, content));
                }
            }
        })
    }

    public getGuideByTitle(title: string): Guide {
        for (const guide of this.guides) {
            if (guide.getTitle() === title) {
                return guide;
            }
        }
        return null;
    }

}

export default GuidesManager;
