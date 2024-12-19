import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes'
class userValidator {

  // validate user registration data
  public registerUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({Code:400, Error: error.message})
    else
      next();
  };

  // validate user login data
  public loginUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({Code:400, Error: error.message})
    else
      next();
  };

  // validate only email
  public validateEmail = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({Code:400, Error: error.message})
    else
      next();
  };

  // validate reset password
  public resetPassword = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({Code:400, Error: error.message})
    else
      next();
  };

  public id = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();
    const { error } = schema.validate(req.body.userId);
    if (error)
      res.status(HttpStatus.BAD_REQUEST).json({Code:400, Error: error.message})
    else
      next();
  };
}

export default userValidator;