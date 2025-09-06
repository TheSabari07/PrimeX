import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_that_should_be_in_env';

interface IRegisterRequestBody extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

interface ILoginRequestBody extends Request {
  body: {
    email: string;
    password: string;
  };
}

router.post('/register', async (req: IRegisterRequestBody, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const newUser: IUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      msg: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
});

router.post('/login', async (req: ILoginRequestBody, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

export default router;