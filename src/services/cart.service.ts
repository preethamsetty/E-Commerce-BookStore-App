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

// update the quantity
public updateQuantity = async (
  userId: string,
  BookId: string,
  quantityChange: number
): Promise<ICart> => {
  const isUser = await User.findById(userId);
  if (!isUser) throw new Error("User doesn't exist");

  const cart = await Cart.findOne({ userId: userId });
  if (!cart) throw new Error("Cart not found");

  const bookIndex = cart.books.findIndex((book) => book.bookId.toString() === BookId.toString());
  if (bookIndex === -1) throw new Error("Book not found in cart");

  const bookDetails = await Book.findOne({ _id: BookId });
  if (!bookDetails) throw new Error("Book not found");

  const existingBook = cart.books[bookIndex];
  let newQuantity = existingBook.quantity + quantityChange;

  if (newQuantity <= 0) {
    cart.books.splice(bookIndex, 1);

    cart.totalQuantity -= existingBook.quantity; 
    cart.totalPrice -= existingBook.quantity * bookDetails.price;
    cart.totalDiscountPrice -= existingBook.quantity * bookDetails.discountPrice;

    if (cart.books.length === 0) {
      cart.totalPrice = 0;
      cart.totalDiscountPrice = 0;
      cart.totalQuantity = 0;
    }

    await cart.save();
    return cart;
  }

  // Checking if quantity is available for increment 
  if (quantityChange > 0 && newQuantity > bookDetails.quantity) {
    throw new Error("Not enough stock available for this book");
  }

  // Update quantity, total quantity, and prices
  cart.books[bookIndex].quantity = newQuantity;
  cart.totalQuantity += quantityChange;
  cart.totalPrice += quantityChange * bookDetails.price;
  cart.totalDiscountPrice += quantityChange * bookDetails.discountPrice;

  await cart.save();
  return cart;
};
}

export default CartService;