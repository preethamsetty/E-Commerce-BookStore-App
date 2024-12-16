import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';

class BookService {

  // Get all Books for a user
  public getBooks = async (): Promise<IBook[]> => {
    const allBooks= await Book.find();
    if(allBooks.length===0){
        throw new Error("No Books Present")
    }
    else{
        return allBooks
    }    
  };
}

export default BookService;
