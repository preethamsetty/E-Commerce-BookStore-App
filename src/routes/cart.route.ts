import express, { IRouter } from 'express';
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
    
    this.router.delete('/:BookId', authMiddleware(), this.CartController.removeItem);

    this.router.put('/:BookId/', authMiddleware(), this.CartController.updateQuantity);
    
    this.router.delete('/:UserId', authMiddleware(), this.CartController.deleteCart);

    this.router.get('/:UserId', authMiddleware(), this.CartController.getCart);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CartRoutes;