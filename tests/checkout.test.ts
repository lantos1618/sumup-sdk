import { Authorization } from '../src/authorization';
import { Checkout } from '../src/checkout';
import { SumUp } from '../src/sumup';
import dotenv from 'dotenv';
import { Currency } from '../src/models/shared';


describe('SumUp', () => {
    let sumUp: SumUp;

    beforeEach(() => {
        dotenv.config();
        if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.API_BASE_URL) {
            throw new Error('Missing environment variables');
        }
        sumUp = new SumUp(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.API_BASE_URL);
    });

    describe('checkout', () => {
        it('should call createCheckout method of Checkout class', async () => {

            await sumUp.getCheckout().createCheckout({
                amount: 100,
                currency: Currency.EUR,
                description: 'Test payment',
                checkout_reference: 'test',
                merchant_code: 'test',
            });

        });
    });
});
