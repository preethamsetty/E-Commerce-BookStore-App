import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import redisClient from '../config/redisClient';
import BookService from '../services/book.service';

class BookController {
  private BookService = new BookService();

    // Create a book
    public createBook = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      try {
          const data = await this.BookService.createBook(req.body,req.file?.path);

          // Clear cache 
          await redisClient.del('books');

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
    public getBook = async (
      req: Request,
      res: Response
    ): Promise<void> => {
        try {
            const data = await this.BookService.getBook(req.params.BookId);
            // Clear cache 
            await redisClient.del('books');
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    message: 'Book fetched successfully',
                    data
                });
            } catch (error) {
              res.status(HttpStatus.BAD_REQUEST).json({
                  code: HttpStatus.BAD_REQUEST,
                  Error: error.message,
              });
            }
      };

    //Get Books
    public getBooks = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const cacheKey = `books:page=${req.params.page}:limit=16}`;
  
      try {
        // Check cache first
        // const cachedData = await redisClient.get(cacheKey);
        // if (cachedData) {
        //   res.status(HttpStatus.OK).json({
        //     code: HttpStatus.OK,
        //     data: JSON.parse(cachedData),
        //     message: 'Books fetched successfully (from cache)',
        //   });
        //   return;
        // }
  
        // Fetch from database if not in cache
        const data = await this.BookService.getBooks(Number(req.params.page), Number(req.query.sortQuery));
  
        // Cache the fetched books data
        // await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
  
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data,
          message: 'Books fetched successfully',
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          Error: error.message,
        });
      }
    };

    
    public getAdminBooks = async (
      req: Request,
      res: Response
    ): Promise<void> => {
            
      try {
      // Fetch from database if not in cache
      const data = await this.BookService.getAdminBooks(req.body.admin_user_id);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data,
          message: 'Book Fetched Successfully',
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          Error: error.message,
        });
      }
  
  };

    //Get All Serched User Books
    public getSearchedBooks = async (
      req: Request,
      res: Response,
    ): Promise<void> => {
      const data =
        await this.BookService.getSearchedBooks(
          req.query.searchQuery as string,
          Number(req.query.sortQuery),
          Number(req.params.page),
        );
      try {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data,
          message: 'Books fetched successfully',
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          Error: error.message,
        });
      }
    };

    //Update By Id
    public updateBook = async (
      req: Request,
      res: Response,
    ): Promise<void> => {

      const data = await this.BookService.updateBook(req.params.BookId, req.body);

      try {
        // Clear cache after book update
        await redisClient.del('books');

        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data,
          message: 'Book Updated Successfully',
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          Error: error.message,
        });
      }
    };

    // Delete a Book by id
    public deleteBook = async (
      req: Request,
      res: Response
    ): Promise<void> => {
        try {
          await this.BookService.deleteBookById(req.params.BookId);
          await redisClient.del('books');

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

      const books = 
      await this.BookService.sortBooks(req.query.order as 'asc'|'desc', Number(req.params.page));
      res.status(200).json({
        code: 200,
        message: 'Books sorted successfully',
        data: books,
      });
    } 
    
    catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Failed to sort books',
        error: error.message,
      });
    }
  };
}

export default BookController;
