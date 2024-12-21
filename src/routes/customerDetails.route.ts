import express, { IRouter } from 'express';
import CustomerDetailsController from '../controllers/customerDetails.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class CustomerDetailsRoutes {
  private router = express.Router();
  private CustomerDetailsController = new CustomerDetailsController();
  constructor() {
    this.routes();
  }

  private routes = (): void => {

    this.router.get('', authMiddleware(),this.CustomerDetailsController.getCustomerDetails);

    this.router.put('/:BookId', authMiddleware(), this.CustomerDetailsController.updateCustomerDetails);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CustomerDetailsRoutes;