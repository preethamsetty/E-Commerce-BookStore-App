import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

class BookService {

 
  // Get all notes for a user
  public getBooks = async (): Promise<IBook[]> => {
    const allNotes= await Book.find();
    return allNotes
  };

 
}

export default BookService;
