import express, { IRouter } from 'express';
import userRoute from './user.route';
import BookRoutes from './book.route';
const router = express.Router();




/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/books', new BookRoutes().getRoutes());

  return router;
};

export default routes;
