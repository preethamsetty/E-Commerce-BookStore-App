import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';

class BookService {
  public getBookById = async (bookId: string): Promise<IBook | null> => {
    const book = await Book.findById(bookId); 
    return book;
  };
}

export default BookService;
