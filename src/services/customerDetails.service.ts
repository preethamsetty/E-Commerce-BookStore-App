import { ICustomerDetails } from '../interfaces/customerDetails.interface';
import CustomerDetails from '../models/customerDetails';
import HttpStatus from 'http-status-codes';

class CustomerDetailsService {
  public createCustomerDetails = async (
    customerData: ICustomerDetails,
  ): Promise<ICustomerDetails> => {
    const customerDetails = new CustomerDetails(customerData);
    await customerDetails.save();

    return customerDetails;
  };

  public updateCustomerDetails = async (
    body: ICustomerDetails,
    customerId: string,
  ): Promise<{
    code: number;
    data: ICustomerDetails | null;
    message: string;
  }> => {
    const customerDetails = await CustomerDetails.findOne({ customerId });

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
  };

  public getCustomerDetails = async (
    userId: string,
  ): Promise<{ code: number; data: ICustomerDetails[]; message: string }> => {
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
  };
}

export default CustomerDetailsService;
