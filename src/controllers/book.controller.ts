import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import BookService from '../services/book.service';

class BookController{
    private BookService = new BookService();
    
  //Get Book by id
    public  getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bookId = req.params.id;
            const data = await this.BookService.getBookById((bookId));
            if (!data) {
                    res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'Book not found'
                    });
                    return;
                }
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    message: 'Book fetched successfully',
                    data
                });
        } catch (error) {
          next(error);
        }
      };
  
  //Get All Books 
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
}

export default BookController;
