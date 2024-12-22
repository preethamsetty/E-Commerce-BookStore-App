import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import { IUser } from '../interfaces/user.interface';

class BookService {
  public createBook = async (
    bookData: IBook
  ): Promise<IBook> => {
    const book = new Book(bookData);
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
    limit: number
  ): Promise<IBook[]> => {
    const skip = (page - 1) * limit;
    const books = await Book.find().skip(skip).limit(limit);

  if (books.length === 0) throw new Error('No Books Present');

  return books;
  };


  // Get all searched user books
  public getSearchedBooks = async (
    searchQuery: string,
    page: number,
  ): Promise<IBook[]> => {
    const searchedBooks = await Book.find({ $text: { $search: searchQuery } })
      .skip((page - 1) * 1)
      .limit(16);

    return searchedBooks.length
      ? searchedBooks
      : await Book.find({ bookName: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * 1)
          .limit(16);
  };

  //update book by Id
  public updateBookInfoById = async (
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
  order: string,
  page: number,
): Promise<{ data: IBook[]; pagination: any }> => {
  const sortOrder = order === 'asc' ? 1 : -1; 
  const skip = (page - 1) * 16; 

  const books = await Book.find()
    .sort({ price: sortOrder })
    .skip(skip)
    .limit(16);

  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / 16);

  if (books.length === 0) {
    throw new Error('No Books Present');
  }

  return {
    data: books,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalBooks: totalBooks,
      limitPerPage: 16,
    },
  };
};

}

export default BookService;
