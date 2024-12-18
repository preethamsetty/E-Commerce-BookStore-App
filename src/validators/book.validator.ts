import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class bookValidator {
    
  // Validate book creation data
  public createBook = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      bookName: Joi.string().required(),
      author: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      discountPrice: Joi.number().required(),
      adminId: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({ Code: 400, Error: error.message });
    else
      next();
  };

  // Validate book update data
  public updateBook = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      bookName: Joi.string(),
      author: Joi.string(),
      quantity: Joi.number(),
      price: Joi.number(),
      description: Joi.string(),
      discountPrice: Joi.number(),
      adminId: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({ Code: 400, Error: error.message });
    else
      next();
  };

  // Validate book id
  public getBookById = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({ Code: 400, Error: error.message });
    else
      next();
  };


  // Validate for getBooks
  public getBooks = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      adminId: Joi.string().required(), // fetch books of a specific admin
    });

    const { error } = schema.validate(req.query);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({ Code: 400, Error: error.message });
    else
      next();
  };

}
export default bookValidator;