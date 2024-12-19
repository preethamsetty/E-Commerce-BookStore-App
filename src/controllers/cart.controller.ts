import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import CartService from '../services/cart.service';


class CartController {
  public CartService = new CartService();

  // Add Book to Cart
  public addToCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try{
    const data = await this.CartService.addToCart(req.body.userId, req.params.BookId)
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
  //Remove Book from Cart
  public removeItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.body; 
      const { BookId } = req.params;
  
      const data = await this.CartService.removeItem({ userId }, BookId);
  
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
  
}

export default CartController;
