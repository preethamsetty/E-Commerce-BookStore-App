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
      '/:page',
      cacheMiddleware('books'),
      this.BookController.getBooks,
    );

    // Route for sorting books by price
    this.router.get(
      '/sort/:page',
      this.BookController.sortBooks,
    );

    // Getting all user books
    this.router.get(
      '/search/:page',
      this.BookController.getSearchedBooks,
    );

    // get book by id - users/admins
    this.router.get(
      '/:BookId',
      this.BookValidator.getBookById,
      this.BookController.getBook,
    );

    // Update book by id - Only admins
    this.router.put(
      '/:BookId',
      authMiddleware(),
      isAdmin,
      this.BookValidator.getBookById,
      this.BookController.updateBook,
    );

    // Delete book by id - Only admins
    this.router.delete(
      '/:BookId',
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