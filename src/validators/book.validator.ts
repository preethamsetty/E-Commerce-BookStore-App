import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class bookValidator {
  // Validate book creation data
  public createBook = [
    check('bookName').isString().notEmpty().withMessage('Book name is required.'),
    check('author').isString().notEmpty().withMessage('Author is required.'),
    check('quantity').isNumeric().withMessage('Quantity must be a number.'),
    check('price').isNumeric().withMessage('Price must be a number.'),
    check('description').isString().notEmpty().withMessage('Description is required.'),
    check('discountPrice').isNumeric().withMessage('Discount price must be a number.'),
    check('adminId').isString().notEmpty().withMessage('Admin ID is required.'),

    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        res.status(HttpStatus.BAD_REQUEST)
           .json({ Code: 400, Errors: errors.array() });
      else
        next();
    },
  ];

  // Validate book update data
  public updateBook = [
    check('bookName').optional().isString().withMessage('Book name must be a string.'),
    check('author').optional().isString().withMessage('Author must be a string.'),
    check('quantity').optional().isNumeric().withMessage('Quantity must be a number.'),
    check('price').optional().isNumeric().withMessage('Price must be a number.'),
    check('description').optional().isString().withMessage('Description must be a string.'),
    check('discountPrice').optional().isNumeric().withMessage('Discount price must be a number.'),
    check('adminId').optional().isString().withMessage('Admin ID must be a string.'),

    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Errors: errors.array() });
      else
        next();
    },
  ];

  // Validate book ID
  public getBookById = [
    check('id').isString().notEmpty().withMessage('Book ID is required.'),

    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Errors: errors.array() });
      else
        next();
    },
  ];
}

export default bookValidator;
