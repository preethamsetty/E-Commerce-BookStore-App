import  Book  from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import  HttpStatus  from 'http-status-codes';

class BookService{

  public getBookById = async (bookId: string):Promise<IBook> => {
    
        const book = await Book.findOne({where: {id: bookId}});
        return book;
  }; 
}

export default BookService;