import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { authMiddleware } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private UserValidator = new userValidator();
 
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

   // Route to register a new user
   this.router.post('', this.UserValidator.registerUser, this.UserController.registerUser);

   // Route to register an admin
   this.router.post('/admin', this.UserValidator.registerUser, this.UserController.registerAdmin);
    
   //route to login
   this.router.post('/login',this.UserValidator.loginUser, this.UserController.loginUser);
    
   //ForgotPassword
   this.router.post('/forgotpassword', this.UserValidator.validateEmail, this.UserController.forgotPassword); 
    
   //route to refreshToken
   this.router.get('', authMiddleware(), this.UserValidator.id, this.UserController.refreshtoken)
   
   //route to reset password
    this.router.post('/resetpassword',this.UserValidator.resetPassword, authMiddleware('reset'), this.UserController.resetPassword);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;