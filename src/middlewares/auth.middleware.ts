import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate requests for:
 * - User authentication
 * - Admin authentication
 * - Reset password verification
 *
 * @param {string} role - The role type: "user", "admin", or "reset"
 * @returns {Function} Middleware function
 */
export const authMiddleware = (role: 'auth' | 'reset' = 'auth') => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => { 
  try {
    // Extract the Bearer token
    const bearerToken = req.header('Authorization')?.split(' ')[1] || null;

    if (!bearerToken) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required',
      });
    }
    else{

      // Select the appropriate secret key based on the role
      let secretKey: string = (role=='auth')?process.env.AUTH_SECRET_KEY:process.env.FORGOTPASSWORD_SECRET_KEY;

        // Verify the token and attach data to the request
      const decoded: any = jwt.verify(bearerToken, secretKey);
      // if(decoded){
        if (role === 'reset') 
          req.body.email = decoded.user.email;// Attach reset email for password recovery
        else {
          req.body.email = decoded.email; // Attach email for User/Admin roles
          req.body.role = decoded.role;   // Include role in the request
          req.body.userId = decoded._id;  // Attach user ID to the request
        }

      next(); // Continue to the next middleware/route handler

    }
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      error: error instanceof jwt.JsonWebTokenError ? 'Invalid or expired token' : error.message,
    });
  }
};
