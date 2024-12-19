import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

export default (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const userRole = req.body.role;
    userRole==='admin'?next():res.status(HttpStatus.BAD_REQUEST).json({
                                code: HttpStatus.BAD_REQUEST,
                                message: 'You are not allowed here'
                              });
  } 
  
  catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};
