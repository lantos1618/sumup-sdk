
// sumup api 

import { Authorization } from "./authorization"
import { CancelCheckoutRequest, CancelCheckoutResponse, CheckoutType, CreateCheckoutRequest, CreateCheckoutResponse, GetCheckoutRequest, ListCheckoutRequest, ListCheckoutResponse, ProcessCheckoutNextStep, ProcessCheckoutRequest, ProcessCheckoutResponse } from "./models/checkout";

export class Checkout {
    // this API is and should be simple so we don't need to create a builder 

    constructor(private authorization: Authorization) { }

    async listCheckouts(checkout: ListCheckoutRequest): Promise<ListCheckoutResponse> {
        const queryURL = "/checkouts";
        const queryParameters = new URLSearchParams(checkout);
        const url = this.authorization.getApiBaseUrl() + queryURL + '?' + queryParameters.toString();
        const method = 'GET';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authorization.getToken()}`
            },
        });
        if (!response.ok) {
            throw await response.json();
        }
        return await response.json() as ListCheckoutResponse;

    }

    async getCheckout(checkout: GetCheckoutRequest): Promise<CheckoutType> {
        const queryURL = "/checkouts";
        // const queryParameters = new URLSearchParams(checkout);
        const url = this.authorization.getApiBaseUrl() + queryURL + '/' + checkout.checkout_reference;
        const method = 'GET';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authorization.getToken()}`
            },
        });


        if (!response.ok) {
            throw await response.json();
        }
        return await response.json() as CheckoutType;

    }

    async createCheckout(checkout: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
        const queryURL = "/checkouts";
        const url = this.authorization.getApiBaseUrl() + queryURL;
        const method = 'POST';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authorization.getToken()}`
            },
            body: JSON.stringify(checkout)
        });

        if (!response.ok) {
            throw await response.json();
        }
        return await response.json() as CreateCheckoutResponse;
    }

    async processCheckout(checkout: ProcessCheckoutRequest): Promise<ProcessCheckoutResponse | ProcessCheckoutNextStep> {
        // for some reason sumup thought it would be a good idea to have 
        // - card
        // - boleto
        // - ideal
        // - sofort
        // - bancontact
        // responses in the same endpoint without types... 
        // so lets map them to a type that we can differentiate

        const queryURL = "/checkouts";

        const url = this.authorization.getApiBaseUrl() + queryURL + '/' + checkout.token;
        const method = 'PUT';

        // response are 200, 202
        // 200 means the payment was processed
        // 202 means the payment is Accepted and is being processed

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(checkout)
        });

        if (response.status === 200) {
            return await response.json() as ProcessCheckoutResponse;
        }
        if (response.status === 202) {
            return await response.json() as ProcessCheckoutNextStep;
        }
        throw await response.json();
    }

    async cancelCheckout(checkout: CancelCheckoutRequest): Promise<CancelCheckoutResponse> {
        const queryURL = "/checkouts";

        const url = this.authorization.getApiBaseUrl() + queryURL + '/' + checkout.checkout_reference;
        const method = 'DELETE';

        // response are 200, 202
        // 200 means the payment was processed
        // 202 means the payment is Accepted and is being processed

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(checkout)
        });

        if (response.status === 200) {
            return await response.json() as CancelCheckoutResponse;
        }
        throw await response.json();
    }
}