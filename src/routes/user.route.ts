import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  constructor() {
    this.routes();
  }

  private routes = () => {
    
   //route to create a new user
   this.router.post('', this.UserController.registerUser);
    
   //route to login
   this.router.post('/login',this.UserController.loginUser);
  
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;