
import { ICustomerDetails } from '../interfaces/customerDetails.interface';
import CustomerDetails from '../models/customerDetails';
import HttpStatus from 'http-status-codes';

class CustomerDetailsService {

    public createCustomerDetails = async (customerData: ICustomerDetails): Promise<ICustomerDetails> => {
        try {
              const customerDetails = new CustomerDetails(customerData);
              await customerDetails.save();

              return customerDetails;
        } catch (error: any) {
          throw new Error("Error creating customer details: " + error.message);
        }
      };
    public updateCustomerDetails = async(body: any, customerId: string): Promise<{ code: number; data: ICustomerDetails | null; message: string }> =>{
        try {
            const customerDetails = await CustomerDetails.findOne({customerId });

            if (customerDetails) {
                customerDetails.name = body.name || customerDetails.name;
                customerDetails.mobileNumber = body.mobileNumber || customerDetails.mobileNumber;
                customerDetails.address = body.address || customerDetails.address;
                customerDetails.city = body.city || customerDetails.city;
                customerDetails.state = body.state || customerDetails.state;

                const updatedDetails = await customerDetails.save();

                return {
                    code: HttpStatus.ACCEPTED,
                    data: updatedDetails,
                    message: 'Customer details successfully updated!',
                };
            } else {
                return {
                    code: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'Customer details not found!',
                };
            }
        } catch (error) {
            throw new Error('Error updating customer details: ' + error.message);
        }
    }

    public getCustomerDetails = async(userId: string): Promise<{ code: number; data: ICustomerDetails[]; message: string }> =>{
        try {
            const customerDetails = await CustomerDetails.find({ userId });

            if (customerDetails && customerDetails.length > 0) {
                return {
                    code: HttpStatus.ACCEPTED,
                    data: customerDetails,
                    message: 'Customer details successfully retrieved!',
                };
            } else {
                return {
                    code: HttpStatus.BAD_REQUEST,
                    data: [],
                    message: 'Customer details not found!',
                };
            }
        } catch (error) {
            throw new Error('Error fetching customer details: ' + error.message);
        }
    }
}

export default CustomerDetailsService