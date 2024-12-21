import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
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
    public  getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bookId = req.params.id;
            const data = await this.BookService.getBookById((bookId));
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
  
      //Get Books
      public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { page, limit } = req.query;
          try {
            const data = await this.BookService.getBooks(Number(page), Number(limit));
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

// Sort and Paginate Books by Price API
public sortBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = (req.query.order as string) || 'asc'; 
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 16; 

    if (order !== 'asc' && order !== 'desc') {
      res.status(400).json({
        code: 400,
        message: "Invalid 'order' value. Use 'asc' or 'desc'.",
      });
    }

    const books = await this.BookService.sortBooks(order, page, limit);
    res.status(200).json({
      code: 200,
      message: 'Books sorted successfully',
      data: books.data,
      pagination: books.pagination,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Failed to sort books',
      error: error.message,
    });
  }
};

}

export default BookController;
