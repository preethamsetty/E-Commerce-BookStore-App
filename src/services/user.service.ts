import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { sendResetEmail } from '../utils/emailService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { uploadImage } from '../utils/cloudinaryService';

class UserService {
  // Register user or admin
  public registerUser = async (
    body: IUser,
    role: 'user' | 'admin' = 'user',
  ): Promise<IUser> => {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) throw new Error(`${role === 'admin' ? 'Admin' : 'User'} already exists`);
    body.role = role;

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    const data = await User.create(body);
    return data;
  };

  //get book by id
    public getUserDataById = async (
      id: string
    ): Promise<IUser | null> => {
      const user = await User.findById({ _id: id });
      if (!user) throw new Error('User Not found');
      else return user;
    };

  // Log in user
  public loginUser = async (body: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string; email: string }> => {
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const accessToken = jwt.sign(
      { user: { _id: user._id, role: user.role, email: user.email } },
      process.env.AUTH_SECRET_KEY  ,{expiresIn:'60s'},
    );

    const refreshToken = jwt.sign(
      { user: { _id: user._id, role: user.role, email: user.email } },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: '7d' },
    );
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, email };
  };

  //Forgot Password
  public forgotPassword = async (
    email: string
  ): Promise<void> => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User Not Found');

    const resetToken = jwt.sign(
      { user: { id: user._id, email: email } },
      process.env.FORGOTPASSWORD_SECRET_KEY,
    );

    await sendResetEmail(email, resetToken);
  };

  //reset password
  public resetPassword = async (body: {
    email: string;
    password: string;
  }): Promise<void> => {
    if (!body.email) throw new Error('Invalid Token');
    await User.updateOne(
      { email: body.email },
      { $set: { password: await bcrypt.hash(body.password, 9) } },
    );
  };

  //refreshToken usage
  public refreshToken = async (refreshToken: string): 
  Promise<{ accessToken: string; refreshToken?: string }> => {
    try {
        const decodedToken = jwt.verify(refreshToken, 
        process.env.REFRESH_SECRET_KEY!) as {
        user: { _id: string; role: string; email: string };
        };

        if (!decodedToken || !decodedToken.user) {
            throw new Error("Invalid refresh token");
        }
        const { _id, role, email } = decodedToken.user;
        const userData = await User.findById(_id);
        if (!userData) {
            throw new Error("User not found");
        }
        if (userData.refreshToken !== refreshToken) {
            throw new Error("Refresh token mismatch");
        }
        const newAccessToken = jwt.sign(
            { user: { _id, role, email } },
            process.env.AUTH_SECRET_KEY!,
            { expiresIn: "30m" }
        );
        const newRefreshToken = jwt.sign(
            { user: { _id, role, email } },
            process.env.REFRESH_SECRET_KEY!,
            { expiresIn: "7d" }
        );
        userData.refreshToken = newRefreshToken;
        await userData.save();

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        console.error("Error in refreshToken service:", error.message);
        throw new Error("Invalid or expired refresh token");
    }
};

  

  //update the user details along with Profile Image
  public async updateUser(
    id: string,
    updateData: {firstName: string, lastName: string},
    filePath?: string
  ): Promise<IUser> {
    let profilePicture = '';

    // If an image is uploaded, upload it to Cloudinary
    if (filePath) {
      const result = await uploadImage(filePath);
      profilePicture = result.secure_url;
    }
    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      id ,
      {
        ...updateData,
        ...(profilePicture && { profilePicture }),
      },
      { new: true }
    );

    if (!updatedUser) throw new Error('User not found');
    
    return updatedUser;
  }
}

export default UserService;
