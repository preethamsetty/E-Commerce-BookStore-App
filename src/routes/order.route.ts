import express, { IRouter } from 'express';
import OrderController from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/redis.middleware';

class ordersRoutes {
  private OrderController = new OrderController();
 
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.post('', authMiddleware(),this.OrderController.orderCart);

    this.router.get('', authMiddleware(),cacheMiddleware('order'),this.OrderController.getOrder);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default ordersRoutes;
