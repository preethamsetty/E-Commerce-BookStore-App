import CustomerDetails from "../models/customerDetails";
import { ICustomerDetails } from "../interfaces/customerDetails.interface";

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
}

export default CustomerDetailsService;
