import request from 'supertest';
import app from '../app';
import * as jwt from 'jsonwebtoken';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhhc3NhbnJhemEiLCJpYXQiOjE3MDUwNjcwNjgsImV4cCI6MTczNjYwMzA2OH0.INPSkiJS-aNXaRA_Ql_aF2iDpw_GFOWMJRJMbtqJVL4";

jest.mock('../services/customerService', () => {
    return {
        CustomerService: jest.fn().mockImplementation(() => ({
            getAllCustomers: jest.fn().mockResolvedValue([
                { name: 'John Doe', email: 'john@example.com' },
                { name: 'Jane Doe', email: 'jane@example.com' }
            ]),
            getCustomerById: jest.fn().mockResolvedValue({
                name: 'John Doe', email: 'john@example.com'
            }),
            createCustomer: jest.fn().mockResolvedValue({
                name: 'Alice Doe', email: 'alice@example.com'
            }),
            updateCustomer: jest.fn().mockResolvedValue({
                name: 'Johnny Doe', email: 'johnny@example.com'
            }),
            deleteCustomer: jest.fn().mockResolvedValue(null)
        }))
    };
});

describe('Customer API', () => {
    it('GET /customers - should return all customers', async () => {
        const mockCustomers = [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Doe', email: 'jane@example.com' }
        ];

        const res = await request(app)
            .get('/api/customers')
            .expect(200);

        expect(res.body).toEqual(mockCustomers);
    });

    it('GET /customers/:id - should return one customers', async () => {

        const res = await request(app)
            .get('/api/customers/1')
            .expect(200);

        expect(res.body).toEqual({
            name: 'John Doe', email: 'john@example.com'
        });
    });

    it('POST /customers - should create one customers', async () => {
        const newCustomer = {
            name: 'Alice Doe', email: 'alice@example.com'
        };
        const res = await request(app)
            .post('/api/customers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Alice Doe', email: 'alice@example.com'
            })
            .expect(201);

        expect(res.body).toEqual({message: process.env.CUSTOMER_SUCCESS_POST_MESSAGE, data: newCustomer});
    });

    it('PUT /customers/:id - should update one customers', async () => {
        const updatedCustomer = {
            name: 'Johnny Doe', email: 'johnny@example.com'
        };
        const res = await request(app)
            .put('/api/customers/1')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedCustomer)
            .expect(201);

        expect(res.body).toEqual({message: process.env.CUSTOMER_SUCCESS_PUT_MESSAGE, data: updatedCustomer});
    });

    it('DELETE /customers/:id - should delete one customers', async () => {

        const res = await request(app)
            .delete('/api/customers/1')
        expect(res.body).toEqual({});
    });
});

beforeEach(() => {
    jest.clearAllMocks(); 
  });
  
