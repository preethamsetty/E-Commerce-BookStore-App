/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

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

}

export default UserController;
