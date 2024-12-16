import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import BookService from '../services/book.service';

class BookController{
    private BookService = new BookService();

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
}

export default BookController;