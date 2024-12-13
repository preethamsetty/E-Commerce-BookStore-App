import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  
  public registerUser = async (body: IUser): Promise<IUser> => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) 
      throw new Error('User already exists');
        // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    // Create a new user
    const data = await User.create(body);
    return data;
   
  };

  // Log in user
  public loginUser = async (body: { email: string; password: string }): Promise<{ token: string; email: string }> => {
    const { email, password } = body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)    
      throw new Error('Invalid email or password');

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error('Invalid email or password');

    // Generate JWT 
    const token = jwt.sign({user:{ _id: user._id,email: user.email}}, process.env.JWT_SECRET);

    return { token, email}; 
  };
  
  //reset password
  public resetPassword = async (body: {
    email: string;
    password: string;
  }): Promise<void> => {
    if (!body.email) throw new Error('Invalid Token');
    await User.updateOne(
      { email: body.email },
      { $set: { password: await bcrypt.hash(body.password, 9) } }
    );
  };
}

export default UserService;