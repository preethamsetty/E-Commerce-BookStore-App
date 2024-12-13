import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {

  // Log in user
  public loginUser = async (body: { email: string; password: string }): Promise<{ token: string; email: string }> => {
    const { email, password } = body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {     
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT 
    const token = jwt.sign({user:{ _id: user._id,email: user.email}}, process.env.JWT_SECRET);

    return { token, email}; 
  };
}

export default UserService;