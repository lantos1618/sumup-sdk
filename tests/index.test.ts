import { Authorization } from '../src/api/authorization';
import { Checkout } from '../src/checkout';
import { SumUp } from '../src/sumup';
import dotenv from 'dotenv';

describe('SumUp', () => {
    let sumUp: SumUp;

    beforeEach(() => {
        dotenv.config();
        if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.API_BASE_URL) {
            throw new Error('Missing environment variables');
        }
        sumUp = new SumUp(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.API_BASE_URL);
    });


});
