import { ICart } from "../interfaces/cart.interface";
import User from "../models/user.model"
import Cart from "../models/cart.model";
import Book from "../models/book.model";
class CartService {
  
  // Add Book to Cart
  public addToCart = async (userId :string, BookId :string): Promise<ICart> => {
    const isUser = await User.findById(userId);

    if(!isUser) throw new Error("User doesn't exist");
    const cart = await Cart.findOne({userId:userId})
    const bookDetails = await Book.findOne({_id:BookId})

    if(!cart){

      const createdData = await Cart.create({
        userId: userId,
        totalPrice: bookDetails.price,
        totalDiscountPrice: bookDetails.discountPrice,
        totalQuantity: 1,
        books: [{bookId: BookId, quantity: 1}]
      });

      return createdData;

    }

    const book = cart.books.findIndex((book) => book.bookId === BookId)
    if(book !== -1) {
      const existData = await Cart.findOneAndUpdate(
        { userId: userId, "books.bookId": BookId },
        { $inc: {
            "books.$.quantity": 1,
            totalPrice: bookDetails.price,
            totalDiscountPrice: bookDetails.discountPrice,
            totalQuantity: 1
          }
        },
        { new: true }
      )
      return existData
    }
    else {
      const existData = await Cart.findOneAndUpdate(
        {userId: userId},
        {$inc: {
          totalQuantity: 1,
          totalPrice: bookDetails.price,
          totalDiscountPrice:  bookDetails.discountPrice
        },  
        $push: { 
          books: { 
            bookId: BookId, 
            quantity: 1 
          } 
        }},
        { new: true }
      )
      return existData
    }
  };
 
  //Remove Book from Cart
public removeItem = async (body: { userId: string }, bookId: string): Promise<ICart | undefined> => {
  const cart = await Cart.findOne({ userId: body.userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Check if the book exists in the cart
  const existingBook = cart.books.find((book: { bookId: string }) => book.bookId === bookId);
  if (!existingBook) {
    throw new Error("Book not found in cart");
  }

  const bookDetails = await Book.findById(bookId);
  if (!bookDetails) {
    throw new Error("Book details not found");
  }

  // Decrement the quantity of the book or remove it if quantity becomes zero
  let updatedBooks = cart.books.map((book: { bookId: string; quantity: number }) => {
    if (book.bookId === bookId) {
      return {
        ...book,
        quantity: book.quantity - 1,
      };
    }
    return book;
  });

  // Filter out books with quantity <= 0
  updatedBooks = updatedBooks.filter((book: { quantity: number }) => book.quantity > 0);

  // Update cart values
  cart.books = updatedBooks;
  cart.totalPrice -= bookDetails.price;
  cart.totalDiscountPrice -= bookDetails.discountPrice;
  cart.totalQuantity -= 1;

  // Ensure totals don't go negative
  cart.totalPrice = Math.max(cart.totalPrice, 0);
  cart.totalDiscountPrice = Math.max(cart.totalDiscountPrice, 0);
  cart.totalQuantity = Math.max(cart.totalQuantity, 0);

  // Save updated cart
  await cart.save();
  return cart;
};
}

export default CartService;