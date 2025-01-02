import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import CustomerDetailsService from '../services/customerDetails.service';

class CustomerDetailsController {
  public customerDetailsService = new CustomerDetailsService();

  public addCustomer = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const customerDetails = await this.customerDetailsService.createCustomerDetails(req.body);

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Customer Details added successfully',
        data: customerDetails,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  };
  
  public getCustomerDetails =async(
    req: Request, 
    res: Response,
  ): Promise<void> => {
    try {
        const result = 
        await this.customerDetailsService.getCustomerDetails(req.body.userId);
        res.status(result.code).json({
            code: result.code,
            data: result.data,
            message: result.message,
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            data: null,
            message: error.message || 'An error occurred',
        });
    }
  };
  public updateCustomerDetails = async(
    req: Request, 
    res: Response,
  ): Promise<void> => {
    try {
      console.log(req.body , req.params.customerId)
      const result = 
      await this.customerDetailsService.updateCustomerDetails(req.body, req.params.customerId);
      console.log(req.body , req.params.customerId)
      res.status(result.code).json({
          code: result.code,
          data: result.data,
          message: result.message,
      });
  } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: error.message || 'An error occurred',
      });
    }
  };
}

export default CustomerDetailsController;
