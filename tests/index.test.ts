import { SumUp } from '../src/index';
import dotenv from 'dotenv';

// the following is the test cases for the SumUp class

describe('SumUp', () => {
    let sumUp: SumUp;
    beforeEach(() => {
        dotenv.config();
        if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.API_BASE_URL) {
            throw new Error('Missing environment variables');
        }
        sumUp = new SumUp(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.API_BASE_URL);
    });

    describe('authorize', () => {
        it('should call getToken method of Authorization class', async () => {
            const getTokenSpy = jest.spyOn(sumUp, 'authorize');
            await sumUp.authorize();
            expect(getTokenSpy).toHaveBeenCalled();
            getTokenSpy.mockRestore();
        });
    });
});