import { Authorization } from '../src/api/authorization';
import { Checkout } from '../src/api/checkout';
import { SumUp } from '../src/sumup';
import dotenv from 'dotenv';

describe('SumUp', () => {
    let sumUp: SumUp;

    beforeEach(() => {
        dotenv.config();
        if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.API_BASE_URL) {
            throw new Error('Missing environment variables');
        }
        sumUp = new SumUp(new Authorization({
            kind: 'bearer',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            apiBaseURL: process.env.API_BASE_URL,
            apiVersion: '/v0.1',
        }));

    });


});
