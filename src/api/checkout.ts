
// sumup api 

import { Authorization } from "./authorization"
import { CancelCheckoutRequest,
     CancelCheckoutResponse,
     CheckoutType,
     CreateCheckoutRequest,
     CreateCheckoutResponse,
     GetCheckoutRequest,
     ListCheckoutRequest,
      ListCheckoutResponse,
       ProcessCheckoutNextStep,
        ProcessCheckoutRequest,
         ProcessCheckoutResponse } from "../models/checkout";
import { checkError } from "../models/shared";

export class Checkout {
    // this API is and should be simple so we don't need to create a builder 

    constructor(private authorization: Authorization) { }

    async listCheckouts(checkout: ListCheckoutRequest): Promise<ListCheckoutResponse> {
        const method = 'GET';
        const queryURL = "/checkouts";
        const queryParameters = new URLSearchParams(checkout);
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '?' + queryParameters.toString();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        };
        const response = await fetch(url, {
            method,
            headers
        });
        checkError(response, method, url, headers);


        return await response.json() as ListCheckoutResponse;

    }

    async getCheckout(checkout: GetCheckoutRequest): Promise<CheckoutType> {
        const method = 'GET';
        const queryURL = "/checkouts";
        // const queryParameters = new URLSearchParams(checkout);
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + checkout.checkout_reference;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        }
        const response = await fetch(url, {
            method,
            headers
        });


        checkError(response, method, url, headers);

        return await response.json() as CheckoutType;

    }

    async createCheckout(checkout: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
        const method = 'POST';
        const queryURL = "/checkouts";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        };
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(checkout)
        });


        checkError(response, method, url, headers);


        return await response.json() as CreateCheckoutResponse;
    }


    async processCheckout(checkout: ProcessCheckoutRequest): Promise<ProcessCheckoutResponse | ProcessCheckoutNextStep> {
        // for some reason sumup thought it would be a good idea to have 
        // also I'm pretty sure this needs to be called on the frontend
        // - card
        // - boleto
        // - ideal
        // - sofort
        // - bancontact
        // responses in the same endpoint without types... 
        // so lets map them to a type that we can differentiate

        const queryURL = "/checkouts";

        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + checkout.checkout_reference;
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

        const method = 'DELETE';
        const queryURL = "/checkouts";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + checkout.checkout_reference;

        // response are 200, 202
        // 200 means the payment was processed
        // 202 means the payment is Accepted and is being processed

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`

        }

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(checkout)
        });

        if (response.status === 200) {
            return await response.json() as CancelCheckoutResponse;
        }
        throw await response.json();
    }
}