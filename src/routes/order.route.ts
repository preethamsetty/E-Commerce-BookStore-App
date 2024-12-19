import express, { IRouter } from 'express';
import OrderController from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class ordersRoutes {
  private OrderController = new OrderController();
 
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.post('', authMiddleware(), this.OrderController.orderCart);

   
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default ordersRoutes;
