import { Authorization } from "./authorization";
import { Checkout } from "./checkout";

export class SumUp {
    private clientId: string;
    private clientSecret: string;
    private authorizationCode?: string;
    private apiBaseURL: string;

    private authorization: Authorization;
    private checkout?: Checkout;


    constructor(clientId: string, clientSecret: string, authorizationCode?: string, apiBaseURL: string = 'https://api.sumup.com/v0.1') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.authorizationCode = authorizationCode;
        this.apiBaseURL = apiBaseURL;
        this.authorization = new Authorization(clientId, clientSecret, apiBaseURL, authorizationCode);
    }

    async authorize() {
        return this.authorization.getToken();
    }

    getAuthorization() {
        return this.authorization;
    }

    getCheckout() {
        if (!this.authorization) throw new Error('Authorization is not initialized');

        if (!this.checkout) {
            this.checkout = new Checkout(this.authorization);
        }
        return this.checkout;
    }

}
