import { Request, Response } from 'express';
import { CustomerService } from '../services/customerService';

const customerService = new CustomerService();

const INTERNAL_SERVER_ERROR_CODE = parseInt(process.env.INTERNAL_SERVER_ERROR_CODE!)

export class CustomerController {
    async getAll(req: Request, res: Response) {
        try {
            const customers = await customerService.getAllCustomers();
            if(customers.some(() => true)) {
                res.status(parseInt(process.env.OK_STATUS_CODE!)).json(customers);
            } else {
                res.status(parseInt(process.env.ERROR_NOT_FOUND_CODE!)).send(process.env.NO_CUSTOMERS_FOUND_MESSAGE);
            }
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(error);
        }
    }

    async getOneById(req: Request, res: Response) {
        try {
            const customer = await customerService.getCustomerById(req.params.id);
            if (!customer) {
                res.status(parseInt(process.env.ERROR_NOT_FOUND_CODE!)).send(process.env.SPECIFIC_CUSTOMER_NOT_FOUND_MESSAGE);
            }
            res.status(parseInt(process.env.OK_STATUS_CODE!)).json(customer);
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(error);
        }
    }

    async createOne(req: Request, res: Response) {
        try {
            const newCustomer = await customerService.createCustomer(req.body);
            res.status(parseInt(process.env.OK_POST_CODE!)).json({message: process.env.CUSTOMER_SUCCESS_POST_MESSAGE, data: newCustomer});
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(error);
        }
    }
    
    async updateOne(req: Request, res: Response) {
        try {
            const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
            if (!updatedCustomer) {
                res.status(parseInt(process.env.ERROR_NOT_FOUND_CODE!)).send(process.env.INVALID_CUSTOMER_ID_MESSAGE);
            }
            res.status(parseInt(process.env.OK_POST_CODE!)).json({message: process.env.CUSTOMER_SUCCESS_PUT_MESSAGE, data: updatedCustomer});
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(error);
        }
    }
    
    async deleteOne(req: Request, res: Response) {
        try {
            const deletedCustomer = await customerService.deleteCustomer(req.params.id);
            if (!deletedCustomer) {
                res.status(parseInt(process.env.ERROR_NOT_FOUND_CODE!)).send(process.env.INVALID_CUSTOMER_ID_MESSAGE);
            }
            res.status(parseInt(process.env.NO_RESPONSE_CODE!)).send();
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(error);
        }
    }
}
