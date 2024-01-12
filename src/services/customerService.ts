import { Customer, ICustomer } from '../models/Customer';

export class CustomerService {
    async getAllCustomers(): Promise<ICustomer[]> {
        return Customer.find();
    }

    async getCustomerById(id: string): Promise<ICustomer | null> {
        return Customer.findById(id);
    }

    async createCustomer(customerData: ICustomer): Promise<ICustomer> {
        const customer = new Customer(customerData);
        return customer.save();
    }

    async updateCustomer(id: string, customerData: Partial<ICustomer>): Promise<ICustomer | null> {
        return Customer.findByIdAndUpdate(id, customerData, { new: true });
    }

    async deleteCustomer(id: string): Promise<ICustomer | null> {
        return Customer.findByIdAndDelete(id);
    }
}
