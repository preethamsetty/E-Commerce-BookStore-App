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

  // Delete the cart
  public deleteCart =  async (userId :string ):Promise<ICart | void> => {

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("User doesn't have Cart");
    await Cart.deleteOne({ userId });
    
  };

}



export default CartService;


