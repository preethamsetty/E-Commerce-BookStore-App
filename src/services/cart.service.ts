import Cart from '../models/cart.model';
import { ICart } from '../interfaces/cart.interface';

export class CartService {
    public  removeItem = async(body: { userId: string }, bookId: string): Promise<ICart> => {
      const cart = await Cart.findOne({ where: { userId: body.userId } });
  
      if (!cart) {
        return undefined
      }
  
      // Check if the book already exists in the cart
      const existingBook = cart.books.find((book: { id: string }) => book.id === bookId);
  
      if (existingBook) {
        // Update books in the cart
        let updatedBooks = cart.books.map((book: { id: string; quantity: number }) => {
          if (book.id === bookId) {
            return {
              ...book,
              quantity: book.quantity - 1,
            };
          }
          return book;
        });
  
        // Filter out books with quantity <= 0
        updatedBooks = updatedBooks.filter((book: { quantity: number }) => book.quantity > 0);
  
        // Update the cart values
        cart.setDataValue("books", updatedBooks);
        cart.books = [...updatedBooks];
        cart.totalPrice -= parseFloat(existingBook.price);
        cart.totalDiscountPrice -= parseFloat(existingBook.discountPrice);
        cart.totalQuantity -= 1;
  
        console.log("Updated cart books", cart.books);
        await cart.save();
  
        return  cart
    
      } else {
        return  undefined
      }
    }
  }

export default CartService;
