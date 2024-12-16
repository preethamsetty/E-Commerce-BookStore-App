import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import BookService from '../services/book.service';

class BookController {
  public BookService = new BookService();

    //This Is For Getting All Books 
    public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const data = await this.BookService.getBooks();
      try {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data,
          message: 'Books fetched successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            Error: error.message,
        });
      }
    };
   };

export default BookController;
