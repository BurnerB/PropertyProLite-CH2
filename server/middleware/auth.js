/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function auth(req, res, next) {
  const token = req.headers.authorization;
  const jwt_token = req.headers.authorization.split(' ')[1];
  if (!token || !jwt_token) {
    return res.status(401)
      .json({
        status: 'error',
        data: 'ACCESS DENIED! No token provided',
      });
  }
  try {
    const decoded = jwt.verify(jwt_token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500)
      .json({
        status: 'error',
        data: 'invalid or expired token',
      });
  }
}


export default auth;
