import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import WishlistService from "../services/wishlist.service";

class WishlistController {
  public wishlistService = new WishlistService();

  public addToWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
      const { BookId } = req.params; 
      const { userId } = req.body; 
  
      const wishlist = await this.wishlistService.addToWishlist(userId, BookId);
  
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Book added to wishlist successfully',
        data: wishlist,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  };
}

export default WishlistController;
