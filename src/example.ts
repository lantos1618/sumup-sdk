import { SumUp } from "./sumup";
import dotenv from 'dotenv';
import { Currency } from "./models/shared";
import { Authorization } from "./authorization";
import { ProcessCheckoutRequestPaymentType } from "./models/checkout";

const main = async () => {

    // 1. Create SumUp instance
    // 2. Authorize
    // 3. Create checkout
    // 4. Process payment
    // 4.1. Create payment
    // 4.2. has the process got a Next_Step?
    // 4.3. if yes, display 3DSecure form
    // 4.4. if no, display success message

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
    console.log("merchantProfile", merchantProfile);

    // // create checkout
    const checkout = await sumUp.getCheckout();

    const checkout_reference = 'test_3';

    // create checkout request
    // const createCheckoutResponse = await checkout.createCheckout({
    //     amount: 1,
    //     currency: Currency.GBP,
    //     description: 'Test payment',
    //     checkout_reference,
    //     merchant_code: merchantProfile.merchant_code,
    //     redirect_url: "http://localhost:3000",
    //     return_url: "http://localhost:3000"
    // });

    // console.log("createCheckoutResponse", createCheckoutResponse);


    const listCheckoutResponse = await checkout.listCheckouts({
        checkout_reference,
    });
    console.log("listCheckoutResponse", listCheckoutResponse);


    // this is the part that needs to be done in the browser
    // const processCheckoutResponse = await checkout.processCheckout({
    //     checkout_reference: listCheckoutResponse[0].id,
    //     payment_type: ProcessCheckoutRequestPaymentType.CARD,
    //     card: {
    //         name: "REDACTED",
    //         number: "REDACTED",
    //         cvv: "REDACTED",
    //         expiry_month: "REDACTED",
    //         expiry_year: "REDACTED",
    //         zip_code: "REDACTED",
    //     },
    // })


    // console.log(processCheckoutResponse)
    // we then need to open or redirect to the url in processCheckoutResponse.next_action.url
    // window.location.href = processCheckoutResponse.next_action.url

    // we then need to poll the status of the checkout until it is either success or failed
    // we can do this by calling listCheckouts again and checking the status

    const getCheckout = await checkout.getCheckout({
        checkout_reference: listCheckoutResponse[0].id,
    });
    console.log("getCheckout", getCheckout);
    
    
    // cancle checkout
    // for(const checkoutResponse of listCheckoutResponse){
    //     const cancelCheckout = await checkout.cancelCheckout({
    //         checkout_reference: checkoutResponse.id
    //     });
    //     console.log(cancelCheckout);
    
    // }


}

main().then(() => {
    console.log('Done');
}).catch((err) => {
    console.error(err);
})