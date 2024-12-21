import express, { IRouter } from "express";
import CustomerDetailsController from '../controllers/customerDetails.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class CustomerDetailsRoutes {
  private router = express.Router();

  private customerDetailsController = new CustomerDetailsController();

  constructor() {
    this.routes();
  }

  private routes = (): void => {

     // Add customer details
    this.router.post('',  authMiddleware(),this.customerDetailsController.addCustomer);
    // Get customer Details
    this.router.get('', authMiddleware(),this.customerDetailsController.getCustomerDetails);
    //Update customer Details
    this.router.put('', authMiddleware(), this.customerDetailsController.updateCustomerDetails);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CustomerDetailsRoutes;
