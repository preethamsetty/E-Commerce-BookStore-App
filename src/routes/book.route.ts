import express, { IRouter } from 'express';
import BookController from '../controllers/book.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import isAdmin from '../middlewares/role.middleware';
import bookValidator from '../validators/book.validator';
import { cacheMiddleware } from '../middlewares/redis.middleware';
class BookRoutes {
  private router = express.Router();
  private BookController = new BookController();
  private BookValidator = new bookValidator();

  constructor() {
    this.routes();
  }

  private routes = (): void => {
    // Create a book - Only admins
    this.router.post(
      '',
      authMiddleware(),
      isAdmin,
      this.BookValidator.createBook,
      this.BookController.createBook,
    );

    // Getting all user books
    this.router.get(
      '',
      cacheMiddleware('books'),
      this.BookController.getBooks
    );

    // Getting all user books
    this.router.get(
      '/search/:page',
      this.BookController.getSearchedBooks);

    // get book by id - users/admins
    this.router.get(
      '/:id',
      this.BookValidator.getBookById,
      this.BookController.getBook,
    );

    // Update book by id - Only admins
    this.router.put(
      '/:id',
      authMiddleware(),
      isAdmin,
      this.BookValidator.getBookById,
      this.BookController.updateBookInfoById,
    );

    // Delete book by id - Only admins
    this.router.delete(
      '/:id',
      authMiddleware(),
      isAdmin,
      this.BookValidator.getBookById,
      this.BookController.deleteBook,
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default BookRoutes;
