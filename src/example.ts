import { SumUp } from "./sumup";
import dotenv from 'dotenv';
import { Currency } from "./models/shared";

const main = async () => {
    // load environment variables
    dotenv.config();
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.API_BASE_URL) {
        throw new Error('Missing environment variables');
    }

    // create SumUp instance

    // const sumUp = new SumUp(process.env.CLIENT_ID, process.env.CLIENT_SECRET,  process.env.AUTHORIZATION_CODE || null, process.env.API_BASE_URL);

    // authorize
    // const token = await sumUp.authorize();
    // console.log(token);

    // // create checkout
    // const checkout = await sumUp.getCheckout().createCheckout({
    //     amount: 100,
    //     currency: Currency.EUR,
    //     description: 'Test payment',
    //     checkout_reference: 'test',
    //     merchant_code: 'test',
    // });

    // console.log(checkout);

    const res = await fetch("https://api.sumup.com/v0.1/me/merchant-profile", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLIENT_SECRET}`
        },

    })

    console.log(await res.json());


}

main().then(() => {
    console.log('Done');
}).catch((err) => {
    console.error(err);
})