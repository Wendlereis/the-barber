import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { de } from 'date-fns/locale';
import { decode } from 'querystring';

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
    throw new Error('Missing JWT token');
  }

  const [, token] = sessionHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_TOKEN);

    console.log({ decoded });

    const { sub } = decoded as Token;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
