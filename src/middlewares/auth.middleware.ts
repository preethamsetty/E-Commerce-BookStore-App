import HttpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware =
  (role: 'auth' | 'reset' = 'auth') => async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bearerToken = req.header('Authorization')?.split(' ')[1] || null;
      if (!bearerToken) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required',
        });
      } else {
        const secretKey: string =
          role === 'auth'
            ? process.env.AUTH_SECRET_KEY
            : process.env.FORGOTPASSWORD_SECRET_KEY;

        const decoded: JwtPayload = jwt.verify(
          bearerToken,
          secretKey,
        ) as JwtPayload;

        if (role === 'reset') req.body.email = decoded.user.email;
        else {
          req.body.email = decoded.user.email;
          req.body.role = decoded.user.role;
          req.body.userId = decoded.user._id;

          if (decoded.user.role === 'admin') 
            req.body.admin_user_id = decoded.user._id;
          
        }
        next();
      }
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        error: error.message,
      });
    }
  };
