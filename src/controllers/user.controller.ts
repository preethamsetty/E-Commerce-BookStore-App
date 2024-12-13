/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response } from 'express';

class UserController {
  public UserService = new userService();

  // Reset User password
  public resetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.UserService.resetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: `Password updated successfully for ${req.body.email}, you 
               can login through your updated password`
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error.message}`
      });
    }
  };
}

export default UserController;
