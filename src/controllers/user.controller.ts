import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';


class UserController {
  public UserService = new userService();

  // Register user
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.UserService.registerUser(req.body as IUser); 
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'User registered successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Register admin
  public registerAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.UserService.registerUser(req.body as IUser, 'admin'); 
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Admin registered successfully'
      });
    } catch (error) {
      next(error);
    }
  };


 // Log in user
 public loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {  accessToken,refreshToken, email} = await this.UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { email , accessToken, refreshToken}, 
      message: 'Log in successful'
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).send(error.message);
  }
};

//Forgot Password
  public forgotPassword = async(req:Request, res:Response)=>{
    try{
      const {email} =req.body;
      await this.UserService.forgotPassword(email);
      res.status(HttpStatus.OK).json({
        code:HttpStatus.OK,
        message:'Reset token sent to email successfully'
      });
    }
    catch(error){
       res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  };  

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