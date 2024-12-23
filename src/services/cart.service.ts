import { ICart } from '../interfaces/cart.interface';
import User from '../models/user.model';
import Cart from '../models/cart.model';
import Book from '../models/book.model';
class CartService {
  public addToCart = async (
    userId: string,
    BookId: string
  ): Promise<ICart> => {
    const isUser = await User.findById(userId);

    if (!isUser) throw new Error('User doesnt exist');

    const cart = await Cart.findOne({ userId: userId });
    const bookDetails = await Book.findOne({
      _id: BookId,
      quantity: { $gt: 0 },
    });
    if (!bookDetails) throw new Error('Book doesnt exist');

    if (!cart) {
      const createdData = await Cart.create({
        userId: userId,
        totalPrice: bookDetails.price,
        totalDiscountPrice: bookDetails.discountPrice,
        totalQuantity: 1,
        books: [{ bookId: BookId, quantity: 1 }],
      });

      return createdData;
    }

    const book = cart.books.findIndex((book) => book.bookId === BookId);

    if (book !== -1) {
      if (cart.books[book].quantity + 1 > bookDetails.quantity)
        throw new Error('Out of Stock');

      const existData = await Cart.findOneAndUpdate(
        { userId: userId, 'books.bookId': BookId },
        {
          $inc: {
            'books.$.quantity': 1,
            totalPrice: bookDetails.price,
            totalDiscountPrice: bookDetails.discountPrice,
            totalQuantity: 1,
          },
        },
        { new: true },
      );
      return existData;
    } else {
      const newBook = await Cart.findOneAndUpdate(
        { userId: userId },
        {
          $inc: {
            totalQuantity: 1,
            totalPrice: bookDetails.price,
            totalDiscountPrice: bookDetails.discountPrice,
          },
          $push: {
            books: {
              bookId: BookId,
              quantity: 1,
            },
          },
        },
        { new: true },
      );
      return newBook;
    }
  };

  public updateQuantity = async (
    userId: string,
    BookId: string,
    quantityChange: number,
  ): Promise<ICart> => {
    const isUser = await User.findById(userId);
    if (!isUser) throw new Error('User doesnt exist');

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) throw new Error('Cart not found');

    const bookIndex = cart.books.findIndex(
      (book) => book.bookId.toString() === BookId.toString(),
    );
    if (bookIndex === -1) throw new Error('Book not found in cart');

    const bookDetails = await Book.findOne({ _id: BookId });
    if (!bookDetails) throw new Error('Book not found');

    const existingBook = cart.books[bookIndex];
    const newQuantity = existingBook.quantity + quantityChange;

    if (newQuantity <= 0) {
      cart.books.splice(bookIndex, 1);

      cart.totalQuantity -= existingBook.quantity;
      cart.totalPrice -= existingBook.quantity * bookDetails.price;
      cart.totalDiscountPrice -=
        existingBook.quantity * bookDetails.discountPrice;

      if (cart.books.length === 0) {
        cart.totalPrice = 0;
        cart.totalDiscountPrice = 0;
        cart.totalQuantity = 0;
      }

    await cart.save();
    return cart;
  }

  // Checking if quantity is available for increment 
  if (quantityChange > 0 && newQuantity > bookDetails.quantity)
    throw new Error('Not enough stock available for this book');


  // Update quantity, total quantity, and prices
  cart.books[bookIndex].quantity = newQuantity;
  cart.totalQuantity += quantityChange;
  cart.totalPrice += quantityChange * bookDetails.price;
  cart.totalDiscountPrice += quantityChange * bookDetails.discountPrice;

  await cart.save();
  return cart;
};

  public removeItem = async (
    userId: string,
    bookId: string,
  ): Promise<ICart | undefined> => {
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) throw new Error('Cart not found');

    // Check if the book exists in the cart
  const existingBookIndex = 
    cart.books.findIndex((book: { bookId: string }) => book.bookId === bookId);
    
  if (existingBookIndex === -1) throw new Error('Book not found in cart');

  // Fetch book details
  const bookDetails = await Book.findById(bookId);
  if (!bookDetails) throw new Error('Book details not found');

  // Decrement the quantity of the book
  const existingBook = cart.books[existingBookIndex];
  if (existingBook.quantity > 1) {
    // Decrease quantity by 1
    cart.books[existingBookIndex].quantity -= 1;
  } else {
    // Remove the book from the cart if quantity reaches 0
    cart.books.splice(existingBookIndex, 1);
  }

  // Adjust total values
  cart.totalPrice -= bookDetails.price;
  cart.totalDiscountPrice -= bookDetails.discountPrice;
  cart.totalQuantity -= 1;

  // Ensure no negative totals
  cart.totalPrice = Math.max(cart.totalPrice, 0);
  cart.totalDiscountPrice = Math.max(cart.totalDiscountPrice, 0);
  cart.totalQuantity = Math.max(cart.totalQuantity, 0);

  // Save updated cart
  await cart.save();

  return cart;
  };

  // Delete the cart
  public deleteCart = async (
    userId: string
  ): Promise<ICart | void> => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('User doesnt have Cart');
    await Cart.deleteOne({ userId });
  };

  public getCart = async (userId: string): Promise<ICart | null> => {

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) throw new Error('User doesnt have Cart');
    return cart;
  };

}

export default CartService;
