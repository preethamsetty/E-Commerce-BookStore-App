import express, { IRouter } from 'express';
import CartController from '../controllers/cart.controller';

class CartRoutes{
  private router = express.Router();
  private CartController = new CartController()

  constructor() {
    this.routes();
  }

  private routes = (): void => {

    //create a book
    this.router.post('/removeItem/:id',this.CartController.removeItem)
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CartRoutes;
