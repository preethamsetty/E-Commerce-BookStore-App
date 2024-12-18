import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import { IUser } from '../interfaces/user.interface';

class BookService {

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

}

export default BookService;
