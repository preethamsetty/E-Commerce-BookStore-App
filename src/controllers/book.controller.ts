import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import BookService from '../services/book.service';

class BooksController {
  public BookService = new BookService();
   /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */

    //This Is For Getting All Books 
    public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const data = await this.BookService.getBooks();
        console.log(data.length)
        if (data.length === 0) {
          console.log(0);
          res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'No Books present for the user'
          });
        } 
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data,
          message: 'Books fetched successfully'
        });
      } catch (error) {
        next(error);
      }
    };
   };

export default BooksController;
