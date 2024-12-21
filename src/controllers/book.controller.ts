import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import redisClient from '../config/redisClient';
import BookService from '../services/book.service';

class BookController{
    private BookService = new BookService();

    // Create a book
    public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const bookData = req.body; // Book data from the request body
          const data = await this.BookService.createBook(bookData);

          res.status(HttpStatus.CREATED).json({
              code: HttpStatus.CREATED,
              message: 'Book created successfully',
              data,
          });
      } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({
              code: HttpStatus.BAD_REQUEST,
              message: error.message,
              error: error,
          });
      }
  };


    
    //Get Book by id
    public  getBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bookId = req.params.id;
            const data = await this.BookService.getBook((bookId));
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    message: 'Book fetched successfully',
                    data
                });
            } catch (error)  {
              res.status(HttpStatus.BAD_REQUEST).json({
                  code: HttpStatus.BAD_REQUEST,
                  Error: error.message,
              });
            }
      };
  
  //Get All Books 
  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.BookService.getBooks();
  
      // Cache the fetched books data
      await redisClient.setEx('books', 3600, JSON.stringify(data));
  
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Books fetched successfully',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  };
  
  
  //Upadate By Id
  public updateBookInfoById = async(req:Request, res:Response ,next:NextFunction):Promise<void> =>{
    const bookId = req.params.id;
    const data= await this.BookService.updateBookInfoById(bookId,req.body);
    try {
      res.status(HttpStatus.ACCEPTED).json({
        code :HttpStatus.ACCEPTED,
        data,
        message: "Book Updated Successfully"
      });
    } catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code:HttpStatus.BAD_REQUEST,
        Error: error.message
      })
    }

  }

      // Delete a Book by id
      public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const bookId = req.params.id;
          await this.BookService.deleteBookById(bookId);

        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Book deleted successfully',
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
