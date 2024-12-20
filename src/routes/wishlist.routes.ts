import express, { IRouter } from 'express';
import WishlistController from "../controllers/wishlist.controller";
import { authMiddleware } from '../middlewares/auth.middleware';

class wishlistRoutes {
    private router = express.Router();
    private WishlistController = new WishlistController();
    constructor() {
      this.routes();
    }
  
    private routes = (): void => {
  
      this.router.post('/:BookId', authMiddleware(), this.WishlistController.addToWishlist);

      this.router.delete('/:BookId', authMiddleware(), this.WishlistController.removeToWishlist);

      this.router.get('', authMiddleware(), this.WishlistController.getWishlist);
      
    };
  
    public getRoutes = (): IRouter => {
      return this.router;
    };
  }
  
  export default wishlistRoutes;
