import { Authorization } from '../src/authorization';
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

    describe('authorize', () => {
        it('should call getToken method of Authorization class', async () => {
            const getTokenSpy = jest.spyOn(Authorization.prototype, 'getToken').mockImplementation(() => Promise.resolve('testToken'));

            await sumUp.authorize();
            expect(getTokenSpy).toHaveBeenCalled();

            getTokenSpy.mockRestore();
        });

        it('should return a token', async () => {
            const token = await sumUp.authorize();
            console.log(token);
        });
    });
});
