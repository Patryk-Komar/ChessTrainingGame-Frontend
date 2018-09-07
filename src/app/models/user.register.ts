export class UserRegister {

    private username: string;
    private email: string;
    private password: string;
    private passwordRepeat: string;
    private firstName: string;
    private lastName: string;
    private regulationsAcceptation: boolean;

    constructor(username?: string, email?: string, password?: string, passwordRepeat?: string, firstName?: string, lastName?: string, regulationsAcceptation?: boolean) {
        this.username = username || "";
        this.email = email || "";
        this.password = password || "";
        this.passwordRepeat = passwordRepeat || "";
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.regulationsAcceptation = regulationsAcceptation || false;
    }

    public validateUsername(): boolean {
        const usernameRegex = new RegExp(/^[A-Za-z][a-zA-Z0-9.-_]{2,15}$/);
        return usernameRegex.test(this.username);
    }

    public validateEmail(): boolean {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegex.test(this.email);
    }

    public validatePassword(): boolean {
        const passwordRegex = new RegExp(/^[A-Za-z\d.!@#$%^^&*-_](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.!@#$%^&*-_]{7,19}$/);
        return passwordRegex.test(this.password);
    }

    public validatePasswordsSimilarity(): boolean {
        return this.password === this.passwordRepeat;
    }

    public validateFirstName(): boolean {
        const firstsNameRegex = new RegExp(/^[A-ZŁŻ][a-ząćęłńóśżź]{2,19}$/);
        return firstsNameRegex.test(this.firstName);
    }

    public validateLastName(): boolean {
        const lastNameRegex = new RegExp(/^[A-ZĆŁŚŻ][a-ząćęłńóśżź]{2,19}$/);
        return lastNameRegex.test(this.lastName);
    }

    public validateRegulations(): boolean {
        return this.regulationsAcceptation;
    }

    public validate(): boolean {
        return (this.validateUsername() && this.validateEmail() && this.validatePassword() && this.validatePasswordsSimilarity()
            && this.validateFirstName() && this.validateLastName() && this.regulationsAcceptation);
    }

    public prepareUsernameAvailabilityRequestURL(): string {
        return `/users/signUp/username/${this.username}`;
    }

    public prepareEmailAvailabilityRequestURL(): string {
        return `/users/signUp/email/${this.email}`;
    }

    static prepareSignUpRequestURL(): string {
        return `/users/signUp`;
    }

}
