import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import { IUser } from '../interfaces/user.interface';

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
  
  //Get Books
    public getBooks = async (page: number, limit: number): Promise<IBook[]> => {
      const skip = (page - 1) * limit;
      const books = await Book.find().skip(skip).limit(limit);

          if (books.length === 0) {
            throw new Error("No Books Present");
          } else {
            return books;
    }
  };

  //update book by Id
  public updateBookInfoById = async (bookId:string,updateData:Partial<IUser>): Promise<IBook | void> => {
    const book = await Book.findById(bookId);
    if(!book){
      throw new Error("Book Not Exit");
    }
    else{
      return await Book.findByIdAndUpdate(bookId, updateData, { new: true });
    }   
  };


  // Delete a book by id
  public deleteBookById = async (bookId: string): Promise<void> => {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new Error('Book not found');
  }
};

}

export default BookService;
