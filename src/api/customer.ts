
// sumup api 

import { Authorization } from "./authorization"
import { ListCheckoutResponse } from "../models/checkout";
import {
    CreateCustomerPaymentInstrumentRequest,
    CreateCustomerPaymentInstrumentResponse,
    CreateCustomerRequest,
    CreateCustomerResponse,
    DeactivateCustomerPaymentInstrumentRequest,
    GetCustomerRequest,
    GetCustomerResponse,
    ListCustomerPaymentInstrumentsRequest,
    UpdateCustomerRequest,
    UpdateCustomerResponse
} from "../models/customer";
import { checkError } from "../models/shared";



export class Customer {
    // this API is and should be simple so we don't need to create a builder 

    constructor(private authorization: Authorization) { }

    async createCustomer(cusomter: CreateCustomerRequest): Promise<CreateCustomerResponse> {

        const method = 'POST';
        const queryURL = "/customers";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/'

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
            body: JSON.stringify(cusomter)
        });

        if (response.status === 200) {
            return await response.json() as CreateCustomerResponse;
        }
        throw await response.json();
    }

    async getCustomer(cusomter: GetCustomerRequest): Promise<GetCustomerResponse> {
        const method = 'GET';
        const queryURL = "/customers";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + cusomter.customer_id;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        }
        const response = await fetch(url, {
            method,
            headers
        });


        checkError(response, method, url, headers);

        return await response.json() as GetCustomerResponse;
    }

    async updateCustomer(cusomter: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
        const method = 'PUT';
        const queryURL = "/customers";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + cusomter.customer_id;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        }
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(cusomter.personal_details)
        });


        checkError(response, method, url, headers);

        return await response.json() as UpdateCustomerResponse;
    }

    async createPaymentInstrument(cusomter: CreateCustomerPaymentInstrumentRequest): Promise<CreateCustomerPaymentInstrumentResponse> {
        const method = 'POST';
        const queryURL = "/customers";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + cusomter.customer_id + '/payment-instruments';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        }
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify({
                type: cusomter.type,
                card: cusomter.card
            })
        });


        checkError(response, method, url, headers);

        return await response.json() as CreateCustomerPaymentInstrumentResponse;
    }

    async listPaymentInstruments(cusomter: ListCustomerPaymentInstrumentsRequest): Promise<ListCheckoutResponse> {
        const method = 'GET';
        const queryURL = "/customers";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + cusomter.customer_id + '/payment-instruments';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        }
        const response = await fetch(url, {
            method,
            headers
        });

        checkError(response, method, url, headers);

        return await response.json() as ListCheckoutResponse;


    }

    async deactivatePaymentInstrument(cusomter: DeactivateCustomerPaymentInstrumentRequest): Promise<void> {
        const method = 'DELETE';
        const queryURL = "/customers";
        const url = this.authorization.getApiBaseUrl() + this.authorization.getApiVersion() + queryURL + '/' + cusomter.customer_id + '/payment-instruments/' + cusomter.payment_instrument_token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        }
        const response = await fetch(url, {
            method,
            headers
        });

        checkError(response, method, url, headers);
    }
}