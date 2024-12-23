import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redisClient';

export const cacheMiddleware = (keyPrefix: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const cacheKey =
        keyPrefix === 'books'
          ? 'books'
          : `${keyPrefix}:${req.params.userId || req.body.userId}`;

      const data = await redisClient.get(cacheKey);
      if (data) {
        res.status(200).json({
          code: 200,
          data: JSON.parse(data),
          message: `${keyPrefix} fetched from cache`,
        });
      } else {
        next();
      }
    } catch (error) {
      console.error('Error with Redis middleware:', error);
      next();
    }
  };
};
