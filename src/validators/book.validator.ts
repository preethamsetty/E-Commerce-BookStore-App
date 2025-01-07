import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import validator from 'validator'; 

class bookValidator {
  // Validate book creation data
  public createBook = [
    check('bookName')
      .isString()
      .notEmpty()
      .withMessage('Book name is required.')
      .custom((value) => {
        if (validator.contains(value, '<script>')) {
          throw new Error('Malicious script detected in book name.');
        }
        return true;
      }),

    check('author')
      .isString()
      .notEmpty()
      .withMessage('Author is required.')
      .custom((value) => {
        if (validator.contains(value, '<script>')) {
          throw new Error('Malicious script detected in author.');
        }
        return true;
      }),

    check('quantity')
      .isNumeric()
      .withMessage('Quantity must be a number.'),

    check('price')
      .isNumeric()
      .withMessage('Price must be a number.'),

    check('description')
      .isString()
      .notEmpty()
      .withMessage('Description is required.')
      .custom((value) => {
        if (validator.contains(value, '<script>')) {
          throw new Error('Malicious script detected in description.');
        }
        return true;
      }),

    check('discountPrice')
      .isNumeric()
      .withMessage('Discount price must be a number.'),

    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        const isMalicious = firstError.msg.includes('Malicious script detected');
        const status = HttpStatus.BAD_REQUEST;
        const message = isMalicious ? firstError.msg : 'Validation error';
        res.status(status).json({ code: status, message });
      } else {
        next();
      }
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
    check('BookId').isString().notEmpty().withMessage('Book ID is required.'),

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
