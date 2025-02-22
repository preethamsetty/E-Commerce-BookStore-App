import HttpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import CartService from '../services/cart.service';
import redisClient from '../config/redisClient';

class CartController {
  public CartService = new CartService();

  // Add Book to Cart
  public addToCart = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
    const data = await this.CartService.addToCart(req.body.userId, req.params.BookId)

     // Clear cache for the user's cart
     await redisClient.del( `cart:${req.body.userId}`);

    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      data : data
    })
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  };

  // Update the Quantity
  public updateQuantity = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const data = await this.CartService.updateQuantity(
        req.body.userId,
        req.params.BookId,
        req.body.quantityChange,
      );

      // Clear cache for the user's cart
     await redisClient.del( `cart:${req.body.userId}`);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  };

  //Remove Book from Cart
  public removeItem = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
  
      const data = await this.CartService.removeItem(req.body.userId, req.params.BookId);
  
      // Clear cache for the user's cart
      await redisClient.del( `cart:${req.body.userId}`);
            
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  };

  public deleteCart = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const data = await this.CartService.deleteCart(req.body.userId);

      // Clear cache for the user's cart
     await redisClient.del( `cart:${req.body.userId}`);
     
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Cart Deleted Successfully',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  };
  // Get Cart
  public getCart = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const data = await this.CartService.getCart(req.body.userId);
      
      // Cache the cart data
      const cacheKey = `cart:${req.body.userId}`;
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Cart Details',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  };
}

export default CartController;
