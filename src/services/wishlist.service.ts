import Wishlist from "../models/wishlist.model";
import Book from "../models/book.model";
import { IWishList } from "../interfaces/wishlist.interface";

class WishlistService {
    public addToWishlist = async (userId: string, bookId: string): Promise<IWishList> => {
        const bookDetails = await Book.findById(bookId);
        if (!bookDetails) {
          throw new Error("Book doesn't exist");
        }
      
        let wishlist = await Wishlist.findOne({ userId: userId });
      
        if (!wishlist) {
          wishlist = new Wishlist({
            userId,
            books: [
              {
                bookId: bookDetails._id.toString(),
                bookName: bookDetails.bookName,
                author: bookDetails.author,
                price: bookDetails.price,
              },
            ],
          });
          await wishlist.save();
        } else {
          const bookExists = wishlist.books.some((book) => book.bookId.toString() === bookId);
      
          if (!bookExists) {
            wishlist.books.push({
              bookId: bookDetails._id.toString(),
              bookName: bookDetails.bookName,
              author: bookDetails.author,
              price: bookDetails.price,
            });
            await wishlist.save();
          } else {
            throw new Error("Book already in wishlist");
          }
        }
      
        return wishlist;
      };

    public removeToWishlist =  async (userId: string, bookId: string): Promise<IWishList | void> => {
    
      try {
        // Find the wishlist by userId
        let wishList = await Wishlist.findOne({ userId: userId });
        console.log(wishList);
    
        if (!wishList) {
          throw new Error("WishList does not exist!");
        }
    
        // Check if the book already exists in the wishlist
        const existingBook = wishList.books.find((book) => book.bookId === bookId);
        console.log(existingBook);
    
        if (existingBook) {
          // Remove the book from the books array
          wishList.books = wishList.books.filter((book) => book.bookId !== bookId);
          console.log('Updated WishList books', wishList.books);
    
          // Save the updated wishlist
          await wishList.save();
    
        } else {
          throw new Error("WishList book does not exist!");
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    // Get Wishlist
    public getWishlist = async (userId: string) => {
      const wishlist = await Wishlist.findOne({ userId: userId });
  
      if (!wishlist) {
        throw new Error("Wishlist not found");
      }
  
      return wishlist;
      };
      
}

export default WishlistService;
