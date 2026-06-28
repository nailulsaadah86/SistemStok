import { Router, Request, Response } from 'express';
import { supabase } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('[AUTH ERROR] JWT_SECRET tidak diatur di environment');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      jwtSecret,
      { expiresIn: 86400 } // 24 hours
    );

    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: token
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
