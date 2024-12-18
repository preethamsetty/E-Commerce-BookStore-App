import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';

class BookService {

  // Create a new book
  public createBook = async (bookData: IBook): Promise<IBook> => {
    const book = new Book(bookData);

    // Save the book to the database
    try {
        const savedBook = await book.save();
        return savedBook;
    } catch (error) {
        throw new Error('Error creating book: ' + error.message);
    }
};

  //get book by id
  public getBookById = async (bookId: string): Promise<IBook | null> => {
    const book = await Book.findById(bookId); 
    if(!book)
      throw new Error("Book Not found")
    else 
      return book
  };
  
  // Get all user books
  public getBooks = async (): Promise<IBook[]> => {
    const allBooks= await Book.find();
    if(allBooks.length===0)
        throw new Error("No Books Present")
    else
        return allBooks
  };
}

export default BookService;
