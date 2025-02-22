import HttpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import redisClient from '../config/redisClient';

class OrderController {
  public OrderService = new OrderService();

  // Order from cart
  public orderCart = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
        const data = await this.OrderService.orderCart(req.body.userId)

        // Clear cache for the user's orders
        await redisClient.del( `wishlist:${req.body.userId}`);
        res.status(HttpStatus.OK).json({
            code : HttpStatus.OK,
            data : data
        })
      }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code : HttpStatus.BAD_REQUEST,
            error : error.message
        })
      }
    };


  // Get orders
  public getOrders = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const orders = await this.OrderService.getOrders( req.body.userId);

      // Cache the order data
      const cacheKey = `order:${ req.body.userId}`;
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(orders));

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: orders,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  };
}

export default OrderController;
