import express, { IRouter } from 'express';
import BooksController from '../controllers/book.controller';

class BookRoutes {
    private router = express.Router();
    private BooksController = new BooksController();
    
    constructor() {
      this.routes();
    }
  
    private routes = (): void => { 
       
      // Getting User Books Data 
      this.router.get('/', this.BooksController.getBooks); 
    };
    public getRoutes = (): IRouter => {
      return this.router;
    };
  }

  export default BookRoutes;