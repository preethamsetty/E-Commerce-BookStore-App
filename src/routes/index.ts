import express, { IRouter } from 'express';
import userRoute from './user.route';
import bookRoute from './book.route';
const router = express.Router();

const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  
  router.use('/books', new bookRoute().getRoutes());

  return router;
  
};

export default routes;
