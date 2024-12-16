import express from 'express';
import BooksController from '../controllers/book.controller';

class BookRoutes {

    private BooksController = new BooksController();
    private router = express.Router();
  
    constructor() {
      this.routes();
    }
  
    public routes = () => { 
       
      // Getting User Books Data 
      this.router.get('/', this.BooksController.getBooks); 
    };
    public getRoutes = () => {
      return this.router;
    };
  }

  export default BookRoutes;