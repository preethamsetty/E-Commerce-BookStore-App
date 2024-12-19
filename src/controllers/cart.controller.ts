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

  // Update the Quantity
  public updateQuantity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const quantityChange = req.body.quantityChange; 
      const data = await this.CartService.updateQuantity(
        req.body.userId,
        req.params.BookId,
        quantityChange
      );
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
  
}

export default CartController;