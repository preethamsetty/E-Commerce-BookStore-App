/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
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