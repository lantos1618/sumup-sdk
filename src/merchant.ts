import { Authorization } from "./authorization";
import { MerchantProfileResponse } from "./models/merchant";



class Merchant {
    constructor(private authorization: Authorization) { }

    async getMerchantProfile(): Promise<MerchantProfileResponse> {
        const queryURL = "/me/merchant-profile";
        const url = this.authorization.getApiBaseUrl() + queryURL;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CLIENT_SECRET}`
            },

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