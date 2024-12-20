import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import CustomerDetailsService from "../services/customerDetails.service";

class CustomerDetailsController {
  public customerDetailsService = new CustomerDetailsService();

  public addCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData = req.body;

      const customerDetails = await this.customerDetailsService.createCustomerDetails(customerData);

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: "Customer Details added successfully",
        data: customerDetails,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  };
}

export default CustomerDetailsController;
