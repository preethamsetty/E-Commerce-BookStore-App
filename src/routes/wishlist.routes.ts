import express, { IRouter } from 'express';
import WishlistController from "../controllers/wishlist.controller";
import { authMiddleware } from '../middlewares/auth.middleware';

class whishlistRoutes {
    private router = express.Router();
    private WishlistController = new WishlistController();
    constructor() {
      this.routes();
    }
  
    private routes = (): void => {
  
      this.router.post('/:BookId', authMiddleware(), this.WishlistController.addToWishlist);
      
    };
  
    public getRoutes = (): IRouter => {
      return this.router;
    };
  }
  
  export default whishlistRoutes;
