import User from "../models/user.model";
import Order from "../models/order.model";
import Book from "../models/book.model";
import CartService from "./cart.service";
import Cart from "../models/cart.model";
import { IOrder } from "../interfaces/order.interface";

class OrderService {

    private cartService = new CartService();

    public orderCart = async ( userId: string ): Promise<IOrder> => {

        const isUser = await User.findById(userId);

        if(!isUser) throw new Error("User doesn't exist");

        const cart = await Cart.findOne({userId:userId})
        
        if(!cart) throw new Error("No items to order yet");
        
        const cartDetails = await this.cartService.getCart(userId);
        let checkStock = await Promise.all(
            cartDetails.books.map( (data) => Book.findOne(
                { _id: data.bookId, quantity: { $lt: data.quantity } },
                { _id: true }
              )
            )
        );
          
        checkStock = checkStock.filter((book) => book !== undefined && book !== null);

        if(checkStock.length>0) throw new Error(`${checkStock} are out of stock`)

        const createdData : IOrder = await Order.create({
            userId: userId,
            cart:{
                totalPrice: cartDetails.totalPrice,
                totalDiscountPrice: cartDetails.totalDiscountPrice,
                totalQuantity: cartDetails.totalQuantity,
                books: cartDetails.books
            }
        });

        createdData.cart.books.map(async(data)=> await Book.updateOne({_id:data.bookId}, {$inc:{quantity: -data.quantity}}))
        await this.cartService.deleteCart(userId)

        return createdData;

    };


    public getOrder = async (userId: string): Promise<IOrder[]> => {
        const orders = await Order.find({ userId });
    
        if (!orders.length) {
            // throw new Error('No orders found for this user');
            return []
        }
    
        return orders;
    };
    
    
      
}

export default OrderService;
