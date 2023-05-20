import { Authorization } from "./authorization";
import { MerchantProfileResponse } from "./models/merchant";



export class Merchant {
    constructor(private authorization: Authorization) { }

    async getMerchantProfile(): Promise<MerchantProfileResponse> {
        const method = 'GET';
        const queryURL = "/v0.1/me/merchant-profile";
        const url = this.authorization.getApiBaseUrl() + queryURL;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await this.authorization.getToken()).access_token}`
        };

        const response = await fetch(url,
            {
                method,
                headers
            })

        if (!response.ok) {
            throw await {
                url,
                status: response.status,
                statusText: response.statusText,
                body: await response.text(),
            }
        }


        return await response.json() as MerchantProfileResponse;
    }
}