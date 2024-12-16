import express, { IRouter } from 'express';
import BookController from '../controllers/book.controller';


class NoteRoutes {
  private router = express.Router();
  private bookController = new BookController();

  constructor() {
    this.routes();
  }

  private routes = (): void => {

    // Route to get a book by its ID
    this.router.get('/:id', this.bookController.getBookById);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;