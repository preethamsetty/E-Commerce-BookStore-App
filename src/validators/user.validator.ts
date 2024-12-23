import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';

class UserValidator {
  // validate user registration data
  public registerUser = [
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Error: errors.array() });
      }
      next();
    },
  ];

  // validate user login data
  public loginUser = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Error: errors.array() });
      }
      next();
    },
  ];

  // validate only email
  public validateEmail = [
    body('email').isEmail(),
    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Error: errors.array() });
      }
      next();
    },
  ];

  // validate reset password
  public resetPassword = [
    body('password').isLength({ min: 6 }),
    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Error: errors.array() });
      }
      next();
    },
  ];

  // validate user ID
  public id = [
    param('userId').isMongoId(),
    (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Code: 400, Error: errors.array() });
      }
      next();
    },
  ];
}

export default UserValidator;
