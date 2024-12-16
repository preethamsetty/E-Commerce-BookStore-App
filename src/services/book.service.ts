import { Book } from './models/book.model';
import { IBook } from '../interfaces/note.interface';
import  HttpStatus  from 'http-status-codes';

class BookService{

  public getBookById = async (bookId: string):Promise<IBook> => {
    try{
        const book = await Book.findOne({where: {id: bookId}});
        if (!book) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                message: 'Book Not Exist!',
            }
        }
        else{
            return {
                code: HttpStatus.OK,
                data: book,
                message: 'Fetched Book Successfully!'
            }
        }
    }
    catch(error){
        return{
            code:HttpStatus.INTERNAL_SERVER_ERROR,
            data:null,
            message:'An error occurred while retrieving the book.'
        }
    }
  }; 
}

export default BookService;