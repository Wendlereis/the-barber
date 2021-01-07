import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../exceptions/AppError';

interface Token {
  iat: number;
  exp: number;
  sub: string;
}

export default function session(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sessionHeader = request.headers.authorization;

  if (!sessionHeader) {
    throw new AppError('Missing session token');
  }

  const [, token] = sessionHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_TOKEN);

    const { sub } = decoded as Token;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
