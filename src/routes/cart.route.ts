import express, { IRouter } from 'express';
// import BookController from '../controllers/book.controller';
import CartController from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
class CartRoutes {
  private router = express.Router();
  private CartController = new CartController();
  constructor() {
    this.routes();
  }

  private routes = (): void => {

    this.router.post('/:BookId', authMiddleware(), this.CartController.addToCart);

    this.router.put('/:BookId/', authMiddleware(), this.CartController.updateQuantity);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CartRoutes;