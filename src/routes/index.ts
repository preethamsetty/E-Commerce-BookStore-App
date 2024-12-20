import express, { IRouter } from 'express';
import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishlistRoutes from './wishlist.routes';
import ordersRoutes from './order.route';
import CustomerDetailsRoutes from './customerDetails.route';

const router = express.Router();

const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  
  router.use('/books', new bookRoute().getRoutes());

  router.use('/cart', new cartRoute().getRoutes());

  router.use('/wishlist', new wishlistRoutes().getRoutes());

  router.use('/orders', new ordersRoutes().getRoutes());

  router.use('/customer', new CustomerDetailsRoutes().getRoutes());
 
  return router;
  
};

export default routes;
