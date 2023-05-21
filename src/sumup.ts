import { AccessToken, Authorization } from "./api/authorization";
import { Checkout } from "./api/checkout";
import { Merchant } from "./api/merchant";
import { Customer } from "./api/customer";

export {
    AccessToken,
    Authorization,
    Checkout,
    Merchant

}


export class SumUp {
    // there are better ways to do api but again we are trying to get to payment as fast as possible
    private authorization: Authorization;
    private checkout?: Checkout;
    private merchat?: Merchant;
    private customer?: Customer;


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

    getCustomer() {
        if (!this.authorization) throw new Error('Authorization is not initialized');

        if (!this.customer) {
            this.customer = new Customer(this.authorization);
        }
        return this.customer;

    }

}
