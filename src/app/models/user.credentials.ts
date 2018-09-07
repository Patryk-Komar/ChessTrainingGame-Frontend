export class UserCredentials {

    private login: string;
    private password: string;

    constructor(login?: string, password?: string) {
        this.login = login || "";
        this.password = password || "";
    }

    public validateUsername(): boolean {
        const usernameRegex = new RegExp(/^[A-Za-z][a-zA-Z0-9.-_]{2,15}$/);
        return usernameRegex.test(this.login);
    }

    public validateEmail(): boolean {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegex.test(this.login);
    };

    public validatePassword(): boolean {
        const passwordRegex = new RegExp(/^[A-Za-z\d.!@#$%^^&*-_](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.!@#$%^&*-_]{7,19}$/);
        return passwordRegex.test(this.password);
    }

    public prepareSignInRequestURL(method: string): string {
        return `/users/signIn/${method}/${this.login}/${this.password}`;
    }

}
