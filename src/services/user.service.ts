import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from '../utils/emailService';

class UserService {

  //Forgot Password
  public forgotPassword = async (email:string) =>{
    const user = await User.findOne(({email}));
    if(!user){
      throw new Error("User Not Found");
    }
    //Generate JWT token for Reset
    const resetToken = jwt.sign({user:{id:user._id}},process.env.JWT_SECRET,{expiresIn:'12h'});

    //Send Email With Token
    await sendResetEmail(email,resetToken);
  };
}

export default UserService;
