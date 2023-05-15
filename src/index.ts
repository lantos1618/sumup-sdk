import { Authorization } from "./authorization";
import { Checkout } from "./checkout";

export class SumUp {
    private clientId: string;
    private clientSecret: string;
    private apiBaseURL: string;

    private authorization?: Authorization;
    private checkout?: Checkout;


    constructor(clientId: string, clientSecret: string, apiBaseURL: string = 'https://api.sumup.com/v0.1') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.apiBaseURL = apiBaseURL;
    }

    public async authorize() {
        this.authorization = new Authorization(this.clientId, this.clientSecret, this.apiBaseURL);
    }

    getCheckout() {
        if (!this.authorization) throw new Error('Authorization is not initialized');
        
        if (!this.checkout) {
            this.checkout = new Checkout(this.authorization);
        }
        return this.checkout;
    }

}
