import { Request, Response } from "express";
import  CartService  from '../services/cart.service';
import HttpStatus from "http-status-codes";

export class CartController {

  private CartService = new CartService();
  public removeItem = async(req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.CartService.removeItem(req.body, req.params.id);

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Book removed successfully',
        data,
    });
    } catch (error) {
      console.error(error);

      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: null,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
}

export default CartController