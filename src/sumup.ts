import { AccessToken, Authorization } from "./authorization";
import { Checkout } from "./checkout";
import { Merchant } from "./merchant";

export class SumUp {
    private authorization: Authorization;
    private checkout?: Checkout;
    private merchat?: Merchant;


    constructor(authorization: Authorization) {
        this.authorization = authorization;
    }


    async authorize(): Promise<AccessToken> {
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



    getMerchant() {
        if (!this.authorization) throw new Error('Authorization is not initialized');

        if (!this.merchat) {
            this.merchat = new Merchant(this.authorization);
        }
        return this.merchat;
    }

}
