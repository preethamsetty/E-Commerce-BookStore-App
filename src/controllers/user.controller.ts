import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  // Register user
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.UserService.registerUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'User registered successfully'
      });
    } catch (error) {
      next(error);
    }
  };

 // Log in user
 public loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { token , email} = await this.UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { email , token }, 
      message: 'Log in successful'
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).send(error.message);
  }
};

}

export default UserController;