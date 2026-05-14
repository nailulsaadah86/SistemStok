import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(403).json({ error: 'No token provided.' });
    return;
  }

  // Handle both "Bearer <token>" and "<token>" formats robustly
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7).trim() 
    : authHeader.trim();

  if (!token) {
    res.status(403).json({ error: 'Empty token provided.' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('[AUTH ERROR] JWT_SECRET tidak diatur di environment');
    res.status(500).json({ error: 'Server configuration error.' });
    return;
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      console.error(`[AUTH ERROR] ${err.name}: ${err.message}`);
      res.status(401).json({ error: 'Failed to authenticate token. Please log out and log in again.' });
      return;
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.userRole !== 'admin') {
    res.status(403).json({ error: 'Require Admin Role!' });
    return;
  }
  next();
}
