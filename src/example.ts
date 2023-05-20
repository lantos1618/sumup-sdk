import { SumUp } from "./sumup";
import dotenv from 'dotenv';
import { Currency } from "./models/shared";
import { Authorization } from "./authorization";

const main = async () => {
    // load environment variables
    dotenv.config();
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.API_BASE_URL) {
        throw new Error('Missing environment variables');
    }

    // create SumUp instance

    const sumUp = new SumUp(new Authorization({
        kind: 'bearer',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        apiBaseURL: process.env.API_BASE_URL,
        apiVersion: '/v0.1',
    }));

    // authorize
    // const token = await sumUp.authorize();
    // console.log(token);

    // // get merchant profile
    const merchant = await sumUp.getMerchant();

    const merchantProfile = await merchant.getMerchantProfile();
    console.log(merchantProfile);

    // // create checkout
    const checkout = await sumUp.getCheckout();

    // // create checkout request
    const createCheckoutResponse = await checkout.createCheckout({
        amount: 10,
        currency: Currency.GBP,
        description: 'Test payment',
        checkout_reference: 'test',
        merchant_code: merchantProfile.merchant_code,
    });



    // console.log(createCheckoutResponse);


    const listCheckoutResponse = await checkout.listCheckouts({
        checkout_reference: 'test',
    });
    console.log(listCheckoutResponse);


    for(const checkoutResponse of listCheckoutResponse){
        const cancelCheckout = await checkout.cancelCheckout({
            checkout_reference: checkoutResponse.id
        });
        console.log(cancelCheckout);
    
    }


}

main().then(() => {
    console.log('Done');
}).catch((err) => {
    console.error(err);
})