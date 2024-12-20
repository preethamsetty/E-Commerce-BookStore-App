import express, { IRouter } from 'express';
import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import whishlistRoutes from './wishlist.routes';
const router = express.Router();

const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  
  router.use('/books', new bookRoute().getRoutes());

  router.use('/cart', new cartRoute().getRoutes());

  router.use('/wishlist', new whishlistRoutes().getRoutes());

  return router;
  
};

export default routes;
