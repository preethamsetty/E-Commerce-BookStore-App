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
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CustomerDetailsRoutes;
