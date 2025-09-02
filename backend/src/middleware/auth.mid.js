import { verify } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
  const token = req.headers['access_token']; // or req.headers['authorization']
  if (!token) return res.status(UNAUTHORIZED).send({ message: 'No token provided' });

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "mysupersecretkey123");
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).send({ message: 'Invalid or expired token' });
  }
};
