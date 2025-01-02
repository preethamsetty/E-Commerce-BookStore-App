import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import { IUser } from '../interfaces/user.interface';
import { uploadImage } from '../utils/cloudinaryService';

class BookService {
  public createBook = async (
    bookData: IBook,
    filePath?: string
  ): Promise<IBook> => {

     let bookImage = '';
        if (filePath) {
          const result = await uploadImage(filePath);
          bookImage = result.secure_url;
        }
        const updatedBookData = {
          ...bookData,
          bookImage, 
        };
    const book = new Book(updatedBookData);
    console.log(updatedBookData)
    const savedBook = await book.save();
    return savedBook;
  };

  //get book by id
  public getBook = async (
    bookId: string
  ): Promise<IBook | null> => {
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book Not found');
    else return book;
  };

  //Get Books
  public getBooks = async (
    page: number,
  ): Promise<[IBook[], number]> => {

    const books = await Book.find().skip((page - 1) * 16).limit(16);

  if (books.length === 0) throw new Error('No Books Present');

  const totalBooks = await Book.countDocuments();

  return [books, totalBooks];
  };


  // Get all searched user books
  public getSearchedBooks = async (
    searchQuery: string,
    page: number,
  ): Promise<IBook[]> => {
    const searchedBooks = await Book.find({ $text: { $search: searchQuery } })
      .skip((page - 1) * 16)
      .limit(16);

    return searchedBooks.length
      ? searchedBooks
      : await Book.find({ bookName: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * 16)
          .limit(16);
  };

  //update book by Id
  public updateBook = async (
    bookId: string,
    updateData: Partial<IUser>,
  ): Promise<IBook | void> => {
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book Not Exit');

    return await Book.findByIdAndUpdate(bookId, updateData, { new: true });
  };

  // Delete a book by id
  public deleteBookById = async (
    bookId: string
  ): Promise<void> => {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) throw new Error('Book not found');
};

// Sort and Paginate Books by Price API
public sortBooks = async (
  order: 'asc'|'desc' = 'asc',
  page: number,
): Promise<IBook[]> => {
  const sortOrder = order === 'asc' ? 1 : -1; 
  const books = await Book.find()
    .sort({ price: sortOrder })
    .skip((page - 1) * 16)
    .limit(16);

  if (books.length === 0) new Error('No Books Present');

  return books
};

}

export default BookService;
