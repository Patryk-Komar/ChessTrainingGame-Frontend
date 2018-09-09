import quotations, { Quotation } from "../utils/quotations";

class QuotationManager {

    private static manager: QuotationManager;

    private constructor() {}

    public static getInstance(): QuotationManager {
        return this.manager || (this.manager = new QuotationManager());
    }

    public getRandomQuotation(): Quotation {
        const random = Math.floor(Math.random() * quotations.length);
        return quotations[random];
    }

}

export default QuotationManager;
