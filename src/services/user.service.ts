import User from '../models/user.model';
import bcrypt from 'bcrypt';

class UserService {
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
