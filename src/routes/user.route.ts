import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new userController();
  private UserValidator = new userValidator();
 
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

   //route to create a new user
   this.router.post('', this.UserValidator.registerUser, this.UserController.registerUser);
    
   //route to login
   this.router.post('/login',this.UserValidator.loginUser, this.UserController.loginUser);
    
   //ForgotPassword
   this.router.post('/forgot-password',this.UserValidator.validateEmail, this.UserController.forgotPassword); 
    
   //route to reset password
   this.router.post('/resetpassword',this.UserValidator.resetPassword, this.UserController.resetPassword);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;