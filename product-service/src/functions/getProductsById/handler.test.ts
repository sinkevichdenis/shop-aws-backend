import { getProductsById } from "./handler";
import { Context } from "aws-lambda/handler";

jest.mock('../../mock/productsList.ts', () => [
    {
        id: 1,
        title: 'title',
        description: 'text',
        price: 10,
        count: 20,
        image: 'path',
    },
]);

describe('getProductsById', () => {
    it('return product', () => {
        const mockEvent = {
            pathParameters: {
                id: 1,
            },
        };
        getProductsById(mockEvent, {} as Context, () => {})
            .then((response) => {
            expect(JSON.parse(response.body).title).toBe('title');
        });
    });
    it('return 404 error', () => {
        const mockEvent = {
            pathParameters: {
                id: 2,
            },
        };
        return getProductsById(mockEvent, {} as Context, () => {}).then((response) => {
            expect(response.statusCode).toBe(404);
        });
    });
});