import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { sendResetEmail } from '../utils/emailService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  
  // Register user or admin
  public registerUser = async (body: IUser, role: 'user' | 'admin' = "user"): Promise<IUser> => {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw new Error(`${role === 'admin' ? 'Admin' : 'User'} already exists`);
    }

    // Assign role programmatically (user or admin)
    body.role = role;

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    // Create the user or admin
    const data = await User.create(body);
    return data;
  };


   // Log in user
   public loginUser = async (body: { email: string; password: string }): Promise<{ accessToken: string; refreshToken: string; email: string }> => {
    const { email, password } = body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)    
      throw new Error('Invalid email or password');

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error('Invalid email or password');

    // Generating Access Token
    const accessToken = jwt.sign({user:{_id:user._id,email:user.email}},process.env.AUTH_SECRET_KEY,{expiresIn:'60s'});
    
    // Generating Refresh Token and saving in data base
    const refreshToken = jwt.sign({user:{ _id: user._id,email: user.email}}, process.env.REFRESH_SECRET_KEY);
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken,refreshToken, email}; 
  };

  //Forgot Password
  public forgotPassword = async (email:string) =>{
    const user = await User.findOne(({email}));
    if(!user){
      throw new Error("User Not Found");
    }
    //Generate JWT token for Reset
    const resetToken = jwt.sign({user:{id:user._id, email:email}},process.env.FORGOTPASSWORD_SECRET_KEY);

    //Send Email With Token
    await sendResetEmail(email,resetToken);
   };

  //reset password
  public resetPassword = async (body: any): Promise<void> => {
    if (!body.email) throw new Error('Invalid Token');
    await User.updateOne(
      { email: body.email },
      { $set: { password: await bcrypt.hash(body.password, 9) } }
    );
  };
 
}

export default UserService;