
// sumup api 

import { Authorization } from "./authorization"
import { CreateCustomerRequest, CreateCustomerResponse, GetCustomerRequest, GetCustomerResponse, UpdateCustomerRequest, UpdateCustomerResponse } from "./models/customer";



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


        if (!response.ok) {
            let body: string = ""
            try {
                body = await response.text();

            } catch (error) {

            }
            throw {
                method,
                url,
                headers,
                status: response.status,
                statusText: response.statusText,
                body: body
            }
        }
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


        if (!response.ok) {
            let body: string = ""
            try {
                body = await response.text();

            } catch (error) {

            }
            throw {
                method,
                url,
                headers,
                status: response.status,
                statusText: response.statusText,
                body: body
            }
        }
        return await response.json() as UpdateCustomerResponse;
    }


}