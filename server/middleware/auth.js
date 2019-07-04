/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import response from '../helpers/responses';

dotenv.config();

function auth(req, res, next) {
  const token = req.headers.authorization;
  const jwt_token = req.headers.authorization.split(' ')[1];
  if (!token || !jwt_token) {
    return response.handleError(401, 'ACCESS DENIED! No token provided', res);
  }
  try {
    const decoded = jwt.verify(jwt_token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return response.handleError(400, 'invalid or expired token', res);
  }
}


export default auth;
